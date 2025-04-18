# Lovely Insults

A collection of witty, non-swearing comebacks and insults.

## Adding New Quotes

To add a new quote to the website:

1. Navigate to the admin page at `/admin/add-quote`
2. Enter your new quote in the text field
3. Click "Generate JSON" to create the JSON for your quote
4. Copy the generated JSON
5. Open `data/quotes.json` in your repository
6. Add the new quote to the JSON array (don't forget to add a comma after the previous quote)
7. Commit and push your changes

Example of adding a new quote to `quotes.json`:

\`\`\`json
[
  // existing quotes...
  {
    "text": "Your existing quote",
    "slug": "your-existing-quote"
  },
  {
    "text": "Your new quote goes here",
    "slug": "your-new-quote-goes-here"
  }
]
\`\`\`

## Sitemap

The sitemap is automatically generated based on the quotes in `data/quotes.json`. Whenever you add a new quote and deploy the site, the sitemap will be updated to include the new quote page.

The sitemap is available at `/sitemap.xml`.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`: The base URL of your website (e.g., https://lovelyinsults.com)
