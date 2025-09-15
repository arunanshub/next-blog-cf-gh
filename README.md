# Nextjs on Cloudflare Workers with GitHub Actions

This project shows you how to deploy a Nextjs website on Cloudflare workers using
GitHub Actions. This also includes:

- Preview deployments with custom URL (both branch and single commit!)
- Preview URL as PR comments, which get updated with every change to the PR.

## Prerequisite

You need to have a Cloudflare API Token and a fair bit of understanding of
`wrangler.json`. Let's create a Cloudflare API token first:

1. Head to <https://dash.cloudflare.com/profile/api-tokens>
2. Click on "Create Token"
3. Then under "API token templates" click on "Edit Cloudflare Workers".
4. Then select the appropriate "Account Resources" and "Zone Resources" and
   "Client IP Address Filtering" settings. I just select my own email for
   account and zone resources.
5. Select an appropriate TTL for the token.

Done! Keep the token safe as `CLOUDFLARE_API_TOKEN` and put this in your
repository secret.

## Setting up the repository/project

Now that you have a Cloudflare API token, you need to set up the Nextjs project.
You can't just use the default project created by `create-next-app` since Nextjs
is Vercel's cash cow, hence they won't give you out-of-the-box support for
deployments to other platforms. Hence, we will use
[**OpenNext**](https://opennext.js.org). To set up a default project, you can
follow their guide on <https://opennext.js.org/cloudflare/get-started>.

In short, you need five things:

1. Modified [`next.config.ts`](./next.config.ts)
2. [`open-next.config.ts`](./open-next.config.ts)
3. [`wrangler.jsonc`](./wrangler.jsonc)
4. [`.dev.vars`](https://developers.cloudflare.com/workers/development-testing/#local-development)
5. [`package.json`](./package.json) with extra helper scripts.

## Setting up Github Actions Workflows

### Production Deployment

The production deployment is fairly simple. You just have to put this step after
your build step:

```yaml
- name: Deploy to Cloudflare Workers with Wrangler (production)
  id: deploy-production
  uses: cloudflare/wrangler-action@v3.14.1
  # deploying to production
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }} # using the same token we created earlier
```

Check [`production.yml`](./.github/workflows/production.yml). **This workflow
runs only on push to master branch**.

### Preview Deployment

The preview deployment is more involved. Here, we are:

1. Getting the name of the branch
2. Using it as our preview URL name
3. Making a comment on the PR with the URL details.

```yaml
# 1. generate an appropriate branch name based URL slug
- name: Set Branch Name
  id: set-branch
  run: |
    BRANCH_NAME="${{ github.head_ref || github.ref_name }}"
    SANITIZED_BRANCH=$(echo "$BRANCH_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[\/_.]/-/g' | sed 's/[^a-z0-9-]//g' | sed 's/^-*//')
    echo "branch_name=$SANITIZED_BRANCH" >> $GITHUB_OUTPUT

# 2. use `wrangler upload` to deploy preview version of your website with the preview URL
- name: Deploy to Cloudflare Workers with Wrangler (preview)
  id: deploy-preview
  uses: cloudflare/wrangler-action@v3.14.1
  if: github.event_name == 'pull_request'
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    command: versions upload --preview-alias git-${{ steps.set-branch.outputs.branch_name }}

# get the preview URLs by parsing the output of the deploy step
- name: Extract Preview URLs
  id: extract-urls
  if: github.event_name == 'pull_request'
  run: |
    OUTPUT="${{ steps.deploy-preview.outputs.command-output }}"
    PREVIEW_URL=$(echo "$OUTPUT" | grep -oP 'Version Preview URL: \Khttps?://[^\s]+' || echo "Not found")
    ALIAS_URL=$(echo "$OUTPUT" | grep -oP '(Version Preview Alias URL|Assigned preview alias .* at): \Khttps?://[^\s]+' || echo "Not found")
    echo "preview_url=$PREVIEW_URL" >> $GITHUB_OUTPUT
    echo "alias_url=$ALIAS_URL" >> $GITHUB_OUTPUT

# 3. make a comment on the PR!
- name: Comment on PR with Preview URLs
  uses: thollander/actions-comment-pull-request@v3
  if: github.event_name == 'pull_request'
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    message: |
      **Cloudflare Preview Deployment**

      - Preview URL: ${{ steps.extract-urls.outputs.preview_url }}
      - Preview Alias URL: ${{ steps.extract-urls.outputs.alias_url }}
    comment-tag: cloudflare-preview
    mode: upsert
```

Check [`production.yml`](./.github/workflows/preview.yml). **This workflow
runs only on pull requests to the master branch**.

## TODO

- [ ] Set up Cloudflare based image optimization loader.
      [^nextjs-doc-cf-img-opt][^cf-docs-img-opt]

[^nextjs-docs-cf-img-opt]: https://nextjs.org/docs/app/api-reference/config/next-config-js/images#cloudflare

[^cf-docs-img-opt]: https://developers.cloudflare.com/images/transform-images/integrate-with-frameworks/
