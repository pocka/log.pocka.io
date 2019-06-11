<svelte:head>
  <title>About - log.pocka.io</title>
</svelte:head>

<h1>About this site</h1>

<p>
  同じことを繰り返さないための備忘録として、自分の知識を周りと共有するためのプチナレッジベースとして書いている技術ブログです。
  一応技術ブログですがゲームやVR、ガジェット等関係ないことも書かれる可能性があります。
</p>

<h2>サイトのしくみ</h2>

<p>
  <a href="https://sapper.svelte.dev/" target="_blank" rel="noopener">Sapper</a>
  という
  <a href="https://svelte.dev/" target="_blank" rel="noopener">Svelte</a>
  ベースのライブラリを使って作成されています。
  サーバとして動かすのではなく、事前に
  <a
    href="https://sapper.svelte.dev/docs#Exporting"
    target="_blank"
    rel="noopener">
    <code>sapper export</code>
  </a>
  を行って完全な静的サイトとして出力しています。
</p>

<p>
  記事はMarkdownで作成し、それを事前にHTMLとYAML
  Frontmatterを含んだJSONに変換してSapperで読み込み利用しています。
  詳細については
  <a
    href="https://github.com/pocka/log.pocka.io"
    target="_blank"
    rel="noopener">
    GitHub上のソースコード
  </a>
  を参照してください。
</p>

<h2>書いているひと</h2>

<p>
  東京都在住のフロントエンドエンジニアです。 パフォーマンス, a11y,
  メンテナビリティとUX/DXに主軸を置いています。
</p>

<h3>スキル</h3>

<ul>
  <li>
    JavaScript
    <ul>
      <li>最新の仕様はできるだけ追っています</li>
      <li>関数型っぽい書き方を好みます</li>
    </ul>
  </li>
  <li>
    TypeScript
    <ul>
      <li>パフォーマンスと抽象を両立させた型を書くことを好みます</li>
    </ul>
  </li>
  <li>
    UIライブラリ/フレームワーク
    <ul>
      <li>Reactをメインに使い、要件次第ではVueも使います</li>
      <li>他にはSvelte, lit-element, hyperapp等を触れます</li>
    </ul>
  </li>
  <li>
    DOM, ブラウザ周り
    <ul>
      <li>Web Componentsはちょくちょく使います</li>
    </ul>
  </li>
</ul>

<h3>アカウントとか</h3>

<table>
  <thead>
    <tr>
      <th>プラットフォーム</th>
      <th>アカウント名</th>
      <th>備考</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Twitter</td>
      <td>
        <a href="https://twitter.com/pockaquel" target="_blank" rel="noopener">
          @pockaquel
        </a>
      </td>
      <td />
    </tr>
    <tr>
      <td>GitHub</td>
      <td>
        <a href="https://github.com/pocka" target="_blank" rel="noopener">
          @pocka
        </a>
      </td>
      <td>
        メールアドレスはここに登録してあるもの(テンプレっぽいメールはスルーしています)
      </td>
    </tr>
  </tbody>
</table>

<h2>使用フォント</h2>

<table>
  <thead>
    <tr>
      <th>適用文字種別</th>
      <th>フォント名</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ラテン(英数字)</td>
      <td>Hind Siliguri</td>
      <td>
        <a
          href="https://fonts.google.com/specimen/Hind+Siliguri"
          target="_blank"
          rel="noopener">
          Hind Siliguri - Google Fonts
        </a>
      </td>
    </tr>
    <tr>
      <td>等幅ラテン(英数字)</td>
      <td>Inconsolata</td>
      <td>
        <a
          href="https://fonts.google.com/specimen/Inconsolata"
          target="_blank"
          rel="noopener">
          Inconsolata - Google Fonts
        </a>
      </td>
    </tr>
    <tr>
      <td>日本語</td>
      <td>M PLUS Rounded 1c</td>
      <td>
        <a
          href="https://fonts.google.com/specimen/M+PLUS+Rounded+1c"
          target="_blank"
          rel="noopener">
          M PLUS Rounded 1c - Google Fonts
        </a>
      </td>
    </tr>
  </tbody>
</table>

<h2>CSS</h2>

<p>
  スクラッチで書いています。詳細については
  <a
    href="https://github.com/pocka/log.pocka.io/blob/master/packages/blog/src/global.css">
    リポジトリにあるソースコード
  </a>
  を参照してください。
</p>

<p>
  <code>font-size: 16px</code>
  <code>line-height: 1.75</code>
  (28px)を基準としてVertical Rhythmに沿ってスタイリングをしています。
</p>
