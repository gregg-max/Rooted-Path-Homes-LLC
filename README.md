# Rooted Path Homes

This is the website for Rooted Path Homes LLC, Gregg and Kristi Arnell's company in southern Illinois. People can look at a home, ask for a tour, and send a note. Homeowners can ask you to buy their house. Investors can join a list for as-is fixer-uppers.

You do not need to be a programmer to add a home or to put this site on the internet. The steps below are written for that.

The GitHub repository is public. Do not put passwords, form keys, or private paperwork in it. The phone number and email on the site are meant to be public. The form key is not. It lives in a setting on the host, not in these files.

## What's on the site

The menu is: Find a Home, How It Works, Helpful Guides, Fixer-Uppers, Sell Us Your House, Our Story, Let's Talk, and a copper **Book a Tour** button. The phone number in the header can be tapped on a phone.

There is one home to start: 426 North St, Murphysboro, IL 62966. The price, down payment, monthly payment, beds, baths, square feet, and photos say **TBD** or show a "photos coming soon" picture. That is on purpose. The site will not invent numbers.

## Add or edit a home

All of the homes live in one file: `data/homes.json`. Each home is one block inside the square brackets.

The easiest way to edit it, once the site is connected to GitHub:

1. Sign in at [github.com](https://github.com).
2. Open this repository, **Rooted-Path-Homes-LLC**.
3. Click the folder `data`, then the file `homes.json`.
4. Click the pencil icon (Edit this file).
5. Change the words. Leave the quote marks and commas where they are. A missing comma is the usual reason a save looks fine but the site does not update.
6. Click **Commit changes**. You can leave the note as it is.
7. Wait one or two minutes. Refresh the live site. It updates on its own.

### What each line means

- **slug** is the web address for that house. Use lowercase words and dashes, like `426-north-st-murphysboro`. Each house needs its own slug. Don't change a slug after you've shared the link, or the old link will stop working.
- **address, city, state, zip** are the real address.
- **status** must be exactly one of these three words: `Available`, `Pending`, or `Sold`. The capitals matter.
- **beds, baths, sqft, purchasePrice, downPayment, monthlyPayment** are the facts under the photo. If you do not know one yet, leave `TBD`. Do not guess. When you do know a price or payment, replace `TBD` with the digits, like `150000`. The site will show a dollar sign for the price, the down payment, and the monthly payment. You can also type `$150,000` if you prefer.
- **description** is the paragraph on the house page. Blank lines between paragraphs are fine. Write what you actually know.
- **photos** is a list of pictures. The first one is the picture on Find a Home.

### Add a photo

1. On your phone or computer, pick the picture.
2. In GitHub, open the folder `public`, then `images`, then `homes`.
3. Click **Add file**, then **Upload files**, and drop the picture in. Use a simple name like `426-front.jpg`. Commit that upload.
4. In `data/homes.json`, point at it like this. You can list more than one. The words after `"alt"` should describe the picture for someone who cannot see it.

```json
"photos": [
  {
    "src": "/images/homes/426-front.jpg",
    "alt": "Front of the house at 426 North St"
  },
  {
    "src": "/images/homes/426-kitchen.jpg",
    "alt": "Kitchen at 426 North St"
  }
]
```

Until you have pictures, leave the coming-soon image that is already there:

```json
"src": "/images/photo-coming-soon.svg"
```

### Add another home

Copy the whole block for 426 North Street, including the `{` and `}`, paste it after that block, and put a comma between the two blocks. Then change the slug, the address, and the other lines. Read the example already in the file and follow the same shape.

If a deploy fails after an edit, open the file again and look for a missing comma, a missing quote, or a status that is not exactly `Available`, `Pending`, or `Sold`. GitHub keeps older versions, so you can also undo that commit.

## Change the phone number or email

Those live in `data/site.json`, not all over the site. Edit that file the same way (pencil, then commit). Use the phone number people should see, and `phoneTel` with a `+1` and no spaces or dashes, like `+13075549940`.

## Where the forms go

These forms are on the site:

- **I'm interested / apply**, on each home
- **Get on the list**, for the next home
- **Book a Tour**
- **Let's Talk**
- **Sell Us Your House**
- **Join the investor list**, on Fixer-Uppers

Each form tells the person that you only use it to reply, and links to the privacy policy. None of them promise that someone is approved.

### One-time setup so the emails reach you

The live site sends each form to [Web3Forms](https://web3forms.com), which emails **gregg@rootedpathhomesllc.com**. Web3Forms has a free plan. Do this once:

1. Go to [https://web3forms.com](https://web3forms.com).
2. Enter `gregg@rootedpathhomesllc.com` and create an access key.
3. Open that email and copy the key. Check the spam folder if it is not in the inbox.
4. In Vercel (the free host, set up in the next section), open the project.
5. Go to **Settings**, then **Environment Variables**.
6. Add a variable named `WEB3FORMS_ACCESS_KEY`. Paste the key as the value. Apply it to Production (and Preview, if you want forms to work on test links too).
7. Open **Deployments**, click the latest one, and choose **Redeploy**. A new variable does not take effect until you redeploy.

The key is not a password to your email, but it is still not something to paste into GitHub or into a text message. Vercel keeps it. This repository never contains it.

### How to read a submission

- The email arrives at **gregg@rootedpathhomesllc.com**. The subject says which form it was, and which house when that matters.
- Web3Forms also keeps a copy in their dashboard, linked from the same email.
- If you are trying the site on your own computer and you have not set the key, the form still says it went through, and a copy is saved in a private folder named `.data` on that computer. That folder is not uploaded to GitHub. On the live site, do not skip the key. Without it, the form tells people to call instead of pretending the email was sent.

## Put the site on the internet for free

This uses Vercel, which is free for a site like this. You need a free GitHub account (you already have this repository) and a free Vercel account.

1. Go to [https://vercel.com](https://vercel.com) and sign up with **Continue with GitHub**. Use the same GitHub account that owns this repository.
2. Click **Add New…**, then **Project**.
3. Find **Rooted-Path-Homes-LLC** and click **Import**.
4. Leave the settings as Vercel detects them (Framework Preset: Next.js). Do not change the build command.
5. Open **Environment Variables** on that same screen and add `WEB3FORMS_ACCESS_KEY` if you already have the key. You can also add it right after the first deploy, then redeploy.
6. Click **Deploy**. The first build takes a minute or two.
7. When it finishes, Vercel gives you a free address that ends in `.vercel.app`. Open it on your phone.

After that, every time you commit a change on GitHub (a new home, a new photo, a fixed sentence), Vercel publishes it for you.

If a deploy fails, Vercel shows a red error on the Deployments tab. The usual cause is a typo in `data/homes.json`. Fix the file, commit again, and it will try once more.

### Your own web address

You can keep the free `.vercel.app` address. When you want a name of your own:

1. Buy a domain from wherever you like (the place that sold it is called a registrar). Common ones are Cloudflare, Namecheap, Google Domains / Squarespace, or GoDaddy. Any of them can point at Vercel.
2. In Vercel, open the project, then **Settings**, then **Domains**.
3. Type the domain, for example `yourdomain.com`, and add it. Add `www.yourdomain.com` too if Vercel offers it.
4. Vercel shows one or two DNS records. They look like a row with a type (`A` or `CNAME`) and a value.
5. At the registrar, open DNS for that domain and add the records exactly as Vercel shows them. Remove an old `A` record for the same name if the registrar says they conflict.
6. Wait. It can take a few minutes, sometimes a few hours. Vercel turns the domain green when it is ready, and it adds the secure `https://` for you.
7. Add one more environment variable so Google and text-message previews use the real address: name `NEXT_PUBLIC_SITE_URL`, value `https://yourdomain.com` with no slash at the end. Redeploy after saving it.

## Look at the site on your own computer

You do not need this to publish. If you, or someone helping you, wants to click around before a change goes live:

1. Install Node.js 20 or newer from [https://nodejs.org](https://nodejs.org) (the LTS download).
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000).

To check that the forms really submit, leave the dev site running and, in a second terminal, run `npm run test:forms`. You should see `All form checks passed.`

To make a production build the same way Vercel does, run `npm run build`, then `npm run start`.

## The logos

- `public/logo-primary.png` is the full logo, with the tagline Where Life Takes Root.
- `public/logo-square.png` is the square version that was provided.
- `public/logo-mark.png` is the tree and house, used in the header and as the small icon so the words are not cut off at tiny sizes.
- `public/og.png` is the picture text messages and Facebook use when someone shares a link. It uses the full logo.

## A few promises the site does not make

The copy says owner financing or seller financing. It does not say someone is approved just because they filled out a form. It does not invent a price. The footer has the Equal Housing Opportunity statement. Please keep new sentences in that same plain, fair voice.
