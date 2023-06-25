# CVHS Senior Assassins

A site for the CVHS Senior Assassins game. This website allows players to track progress and identify targets, controlled using a master Google Spreadsheet for ease of admin access.

I was commissioned to build this site by the people organizing the game in order to simplify game management. I'm not entirely sure how the game turned out in the end, but it was interesting to build. Using Google Sheets as an admin interface makes it much easier for people to use, and directly accessing the API using a library is faster than proxying through Google Apps Script, which I used to do.

## Setup

First, generate a service account for Google API access. See the [`google-spreadsheet` docs](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account) for more information.

Once you have a service account, create a `.env` file in the root of the project with the following contents:

```bash
JWT_SECRET=""
SHEETS_ID=""
GOOGLE_PRIVATE_KEY="YOUR PRIVATE KEY"
GOOGLE_SERVICE_EMAIL="YOUR SERVICE ACCOUNT EMAIL"
```

You can generate a random string for `JWT_SECRET` using `openssl rand -base64 32` or `node -e "require('crypto').randomBytes(32, function(ex, buf) { console.log(buf.toString('base64')) });"`.

Then, create a spreadsheet for your admin interface. Copy the ID from the URL (it's the long string of characters between `/d/` and `/edit`) and put it in your `.env` file.

Finally, share the spreadsheet with the service account email you generated earlier.

This project expects a sheet named "Participant Information" with the following columns:

- `ID` (string)
- `Name` (string)
- `Team Number` (string)
- `Team Name` (string)
- `Password` (string)
- `Eliminated` (checkbox)
- `Disqualified` (checkbox)
- `Advancing` (checkbox)

as well as a sheet named "Targets" with the following columns:

- `Team Number` (string)
- `Target Team Number` (string)

These columns may be in any order, but the names must match exactly. Additional columns will be ignored, so you can add additional information if you'd like.

## Development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

## Building

To build the project, run:

```bash
npm run build
```
