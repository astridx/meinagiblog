https://www.smashingmagazine.com/2020/07/understanding-plugin-development-gatsby/

	https://dev.to/creativcoder/how-to-add-comment-support-on-your-gatsby-blog-using-github-utterances-423n

Kommentar im Gatsby-Blog mit Github Utterances

In diesem Beitrag zeige ich, wie du Kommentare mithilfe des kostenlosen Open Source-Dienstes Github Utterances in eine Gatsby-Website integrierst.

Ich wünsche mir ein Feedback zu meinen Texten. Dabei ist es mir wichtig, dass die Kommentarfunktion sicher und werbefrei ist. Bei https://www.taniarascia.com/ habe ich mir eine Lösung abgeguckt, die meiner Meinung nach vorerst dem Zweck dient, mit in Kontakt zu treten.

Im Folgenden findest du eine Kurzanleitung zum Integrieren des Kommentarsystems [Utterances von Github](https://github.com/utterance) in einen Gatsby Blog.
Utternaces ist eine Kommentarfunktion, die auf Github-Issues aufbaut. Einige der Highlights sind:

- Open Source. 

- Kein Tracking, keine Werbung und kostenlos.

- Keine versteckten Daten. Alle in GitHub gespeicherten Daten sind öffentlich. 

- Gestylt mit Primer, dem CSS-Toolkit, das GitHub unterstützt. 

-  Dunkles Theme

-  Leicht und unkompliziert Vanille TypeScript. Keine Schriftdownloads, JavaScript-Frameworks oder Polyfills für immergrüne Browser.


> Achtung: Voraussetzung bei Utterances ist, dass die Zielgruppe über ein Github-Konto verfügt. Da sich mein Blog hauptsächlich an Entwickler richtet, passt dies perfekt.


Die [Dokumentation] (https://utteranc.es/) zeigt die Integration des Kommentar-Widgets in eine Vanille-HTML-Website. Das funktioniert in meinem Fall nicht, da ich eine [GatsbyJS](https://www.gatsbyjs.org/) betreibe. Gatsby verwendet React unter der Haube, was bedeutete, dass ich Utterances als [React-Komponente](https://reactjs.org/docs/components-and-props.html) integriere.
Fangen wir aber vorne an. Zuerst richte ich ein Github-Repository ein. Es ist zwingend, dass dieses öffentlich ist. Ich habe github.com/astridx/meinagiblog erstellt. 
Dann wechsele ich zu https://github.com/apps/utterances . Auf der rechten Seite sehe ich einen grüne Button mit dem Text „install„, weil ich Utterances bisher nicht installiert habe. Ich klicke auf die Schaltfläch und nenne das Repository, in dem Sie das Widget zur Verfügung haben möchte. In meinem Fall ist das github.com/astridx/meinagiblog.

Nach der Installation werde ich zu dieser [Seite] (https://utteranc.es/) weitergeleitet, die mir das Code-Schnippsel zum Aktivieren der Kommentare zeigt:

`` `
<script src=“https://utteranc.es/client.js“
        repo=“[ENTER REPO HERE]“
        issue-term=“pathname“
        theme=“github-light“
        crossorigin=“anonymous“
        async>
</script>
`` `

Wie oben erwähnt, ist es erforderlich, das Skript in ein Container-Tag einzufügen. Ich brauche eine React-Komponente, die aufgerufen wird, wenn ein Blogpost gerendert wird.

Ich habe zuerst eine ([eine Funktionskomponente] (https://www.robinwieruch.de/react-function-component)) Comments.js`:

`` `
// commment.js

import React from ‚react‘

export default function Comment({ commentBox }) {
  return <div ref={commentBox} className=“comments“ />
}


`` `

Dies ist eine triviale Komponente. Wichtig ist die „commentBox“ -Referenz. [React Refs] (https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) bietet eine Möglichkeit, auf DOM-Knoten oder React-Elemente zuzugreifen, die mit der Rendermethode einer Komponente erstellt wurden. Wir werden später sehen, wie das verwendet wird.

Als Nächstes habe ich eine <Post> -Komponente in meinem Blog, die jeden Blog-Beitrag rendert. Hier soll das Kommentar-Widget am Ende jedes Beitrags erscheinen. Ich brauchte eine Möglichkeit, die Komponente „Kommentare“ bedingt zu rendern. Um dies zu erreichen, habe ich mich auf die Prop „Auszug“ verlassen, die „wahr“ ist, wenn die gerenderte Seite eine Indexseite ist, auf der nur ein Auszug aller Blog-Beiträge angezeigt wird. In anderen Fällen ist es auf „false“ gesetzt. Wir können das verwenden, um die Komponente „Kommentare“ wie folgt zu rendern:

`` `
// components / posts.js
{Auszug? <> </>: <Comment commentBox = {commentBox} />}

`` `

Es ist der übliche ternäre Operator. Die Syntax `<> </>` lautet [Fragmente] (https://reactjs.org/docs/fragments.html) in Reaktion, die im wahren Zweig leer ist, da wir das Widget nur rendern möchten, wenn der Benutzer sich in auf der Blogpost-Seite. Wir sehen auch, dass das Kommentar-Widget eine `commentBox`-Prop hat, die übergeben wird. Auf diese Weise erhalten wir Zugriff auf die Komponente „Kommentar“ zur Verwendung in der Komponente „Beiträge“. Wir werden diesen Verweis verwenden, um das Kommentarskript-Tag anzuhängen.

Zurück in meiner „Posts“ -Komponente erstelle ich eine Referenz, die an die „commentBox“ -Prop auf der „Comment“ -Komponente angehängt wurde:

`` `
// components / post.js
const commentBox = React.createRef ()

`` `

Dann benutze ich den Hook „useEffect“, um das Skript-Tag der Komponente „Comment“ über die Referenz hinzuzufügen:

`` `
  const commentBox = React.createRef ()

  useEffect (() => {
    const scriptEl = document.createElement (‚script‘)
    scriptEl.async = true
    scriptEl.src = ‚https://utteranc.es/client.js‘
    scriptEl.setAttribute (‚repo‘, ‚creativcoder / creativcoder.dev-Kommentare‘)
    scriptEl.setAttribute (‚Issue-Term‘, ‚Title‘)
    scriptEl.setAttribute (‚id‘, ‚Äußerungen‘)
    scriptEl.setAttribute (‚theme‘, ‚github-light‘)
    scriptEl.setAttribute (‚crossorigin‘, ‚anonym‘)
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild (scriptEl)
    } else {
      console.log (`Fehler beim Hinzufügen von Äußerungen Kommentare zu: $ {commentBox}`)
    }}
  }, [])

`` `

Der Code in „useEffect“ wird jedes Mal aufgerufen, wenn eine Post-Komponente gerendert wird, die dann das Kommentar-Widget an jede Blog-Post-Seite anfügt. Sie können sehen, dass die gleichen Skriptattribute hinzugefügt werden, jedoch mit Javascript. Wir hängen es dann über seine Eigenschaft „current“ an die „commentBox“ -Referenz an, die beim Rendern aktiv ist.