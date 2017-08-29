<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">About</h1>
          <p class="subtitle is-4">このサイトについて</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="box">
          <h2 class="title">目的</h2>
          <p>
            このサイトは自分の得た知識や経験をアウトプットすることを目的とした"ログ"である。
            <br/>
            アウトプットをする理由としては、自分の能力向上とWeb上の知識の蓄積が期待できるためである。
          </p>
        </div>
        <div class="box">
          <h2 class="title">誤表記や誤字脱字の修正依頼等について</h2>
          <p>
            誤字や脱字、内容の修正等の要望がある場合は、GitHubの
            <a href="https://github.com/pocka/log.pocka.io/pulls">PullRequest</a>
            又は
            <a href="https://github.com/pocka/log.pocka.io/issues">Issue</a>
            を使ってください。
          </p>
        </div>
        <div class="box">
          <h2 class="title">方針</h2>
          <p>
            記事は大きく2つに大別し、それぞれ以下の運用方針をとる。
          </p>
          <hr/>
          <h3 class="title is-4">ブログ</h3>
          <p>
            一般的なブログ記事と同じもので、事象を単に記録したものや、
            ライブラリやソフト等の紹介・使い方・バグに対するワークアラウンドなど、一時的な情報を記載する。
            誤字や重大な誤記、直すべきところは修正するが、内容の更新は原則行わない。
            最終更新日から一定期間が経過したものについてはその旨記事の頭に注釈を表示する。
            <span class="tag is-dark">blog</span>タグをつけて区別する。
          </p>
          <hr/>
          <h3 class="title is-4">記事</h3>
          <p>
            技術的な概念や基礎技術/知識、方法論など、長く変わらないものや恒久的な情報を記載する。
            記載した内容が変わったのであれば、可能な限り更新を行う。
            内容の更新を行う理由としては、内容の更新をせずに古い情報がのさばっていたり、
            コメントや追記でわかりづらく更新が追加されている等、
            ユーザビリティを大きく欠くサイトに自分がうんざりしているためである。
            また、何らかの理由で更新がかなわなくなった場合は、
            更新停止した旨及び最終更新からどの程度経過しているのかを記事の頭に記載する。
            <span class="tag is-dark">article</span>タグをつけて区別する。
          </p>
          <hr/>
          <p>
            また、以下の点は2つとも共通とする。
          </p>
          <div class="content">
            <ul>
              <li>Gitのコミットログを更新履歴とする</li>
              <li>原則的に更新の形跡を記事に残して汚すことはしない</li>
              <li>記事の修正、更新はGitHubのPullRequest機能を用いて行う</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>

