<div align="center">

# log.pocka.io

[![GitHub last commit](https://img.shields.io/github/last-commit/pocka/log.pocka.io.svg)]()
[![GitHub commit activity the past week, 4 weeks, year](https://img.shields.io/github/commit-activity/y/pocka/log.pocka.io.svg)]()

</div>

---

## For development

### Run Server

```shell
$ yarn dev -p 8080

# Specify host to bind
$ yarn dev -H mydomain.example -p 8080
```

### Requirements

- nvm or ASDF (optional, but recommended)
- Yarn

### Commands

| Command      | Description                |
| ------------ | -------------------------- |
| `yarn build` | Builds blog and feeds.     |
| `yarn dev`   | Starts development server. |

### Directories

- `public/images/` ... Image files which is used by posts.
- `contents/[locale]/` ... Post markdown files.

### Markdown Extensions

#### List of custom elements

These elements going to be converted to React components at runtime.

##### `<blog-alert>`

Alert component.

| Prop Name | Type                                                  | Description            |
| --------- | ----------------------------------------------------- | ---------------------- |
| `variant` | `"info" \| "tips" \| "note" \| "warning" \| "danger"` | Severity of the alert. |

```md
<blog-alert variant="tips">

Blah Blah _Blah_

</blog-alert>
```

##### `<blog-youtube>`

Embed Youtube video.

| Prop Name     | Type     | Description            |
| ------------- | -------- | ---------------------- |
| `src`         | `string` | Same for normal embed. |
| `aspectratio` | `string` | Defaults to `16:9`     |

```md
<blog-youtube src="https://www.youtube.com/embed/dQw4w9WgXcQ" aspectratio="3:2"></blog-youtube>
```
