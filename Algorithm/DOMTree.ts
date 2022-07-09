window.onload = () => 
{
    let str = "";

    // bodyタグにぶら下がる子ノードを取得する
    const childNodes = document.body.childNodes;

    // 子ノードの数だけループ
    for(let i = 0; i < childNodes.length; ++i)
    {
        // 子ノードのタグ名を取得して、「undefined」の場合はスキップ
        // Elementノードと違い、テキストノードの場合はtagNameプロパティを持たない
        // ソースコード内に存在する空白や改行はテキストノードになる
        if((childNodes[i] as Element).tagName !== undefined)
        {
            // 「-P<br/>」のような文字列を作る。tagNameプロパティは要素のタグ名を返す
            str = str + "-" + (childNodes[i] as Element).tagName + "<br/>";

            // 子ノードの最初の子ノードを取得する。bodyタグから見ると孫ノードになる
            let child = childNodes[i].firstChild;

            // 孫ノードがnull(無くなる)になるまでループ
            while(child !== null)
            {
                // テキストノードを取り除くチェック
                if((child as Element).tagName !== undefined)
                {
                    // 孫ノードのタグ名を文字列に追加していく
                    // 「&nbsp;」はhtml上では「 」(空白スペース)になる
                    // 先程の文字列と組み合わせると
                    // -UL
                    //  -LI
                    // のように表示される(ノード間の階層を表現したい)
                    str = str + "&nbsp;&nbsp;&nbsp;-" + (child as Element).tagName + "<br/>";
                }

                // 他の孫ノードを取得する。孫ノードから見ると兄弟ノードになる
                child = child.nextSibling;
            }
        }
    }

    // 結果を出力する
    document.getElementById("output")!.innerHTML = str;
}

/*
    DOMは木構造になっていることを理解するサンプル

    <p><a href="https://www.google.co.jp">Google</a></p>

    <ul>
        <li>1番目</li>
        <li>2番目</li>
        <li>3番目</li>
    </ul>

    <hr>

    <p>DOMの解析結果</p>

    <div id="output"></div>

    <script src="./index.js"></script>

    というHTMLを各タグのツリー構造として処理していることが分かる
    

    DOMの解析結果

    -P
      -A
    -UL
      -LI
      -LI
      -LI
    -HR
    -P
    -DIV
    -SCRIPT

    ulタグはliタグを3つ孫として持っていることが分かる。3つのliタグはそれぞれ兄弟ノードの位置になっている
    pタグやul、hrタグはそれぞれ同階層のタグで、親のbodyタグから見ると子ノード達になる
    「Parent.appendChild(ChildNode)」等としてDOM操作するのは、HTMLを木構造を使って操作しているから

    単純に「document.body.childNodes」とすると
    [text, p, text, ul, text, hr, text, p, text, ...] のように「text」というノードまで付いてくる
    これはテキストノードと言ってノードの1つではあるがエレメントではないのでtagNameプロパティを持たない
    テキストノードなんて追加していないのにいつの間にか存在するのは、htmlを書いている時の空白や改行がテキストノードになるから
    
    <p><a href="https://www.google.co.jp">Google</a></p>

    <ul>

    このpタグとulタグの間の空白がテキストノードになってしまう
    なので「if((childNodes[i] as Element).tagName !== undefined)」で弾いている
*/