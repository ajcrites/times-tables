provider "netlify" {
  token = "${var.netlify_token}"
}

resource "netlify_site" netlify_site {
  name = "${var.app_name}"
  custom_domain = "${var.site_name}"
  repo {
    provider = "github"
    command = "yarn build"
    dir = "build"
    repo_path = "ajcrites/times-tables"
    repo_branch = "master"
  }
}