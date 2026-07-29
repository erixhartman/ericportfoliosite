# Eric Hartman Portfolio

A fast, dependency-free personal portfolio designed for deployment on Vercel.

## Edit your content

Almost all text lives in `content.js`.

1. Open `content.js` in any text editor.
2. Change the text inside quotation marks.
3. Save the file.
4. Commit and push the change to GitHub. Vercel will deploy it automatically.

### Show your phone number

In `content.js`, change:

```js
showPhone: false,
```

to:

```js
showPhone: true,
```

It is hidden by default to reduce spam and unwanted calls.

### Add your resume

1. Put your PDF in this folder and name it `Eric-Hartman-Resume.pdf`.
2. In `content.js`, change:

```js
resumeUrl: "",
```

to:

```js
resumeUrl: "Eric-Hartman-Resume.pdf",
```

### Change colours

Open `styles.css` and edit the colour variables at the very top:

```css
--bg: #0b0d10;
--text: #f5f1e8;
--accent: #b8ff5b;
--accent-2: #72dcff;
```

## Preview locally

You can double-click `index.html`, but a local server is more reliable.

If Python is installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy with GitHub and Vercel

1. Create a new GitHub repository, such as `eric-hartman-portfolio`.
2. Upload all files from this folder to the repository.
3. In Vercel, choose **Add New → Project**.
4. Connect GitHub when prompted.
5. Import the repository.
6. Leave the framework preset as **Other** and leave build settings blank.
7. Select **Deploy**.
8. Vercel will provide a live `vercel.app` URL.

Every future push to your main GitHub branch will update the production site automatically.

## Recommended next steps

- Add a professional headshot only if it strengthens the positioning.
- Add a downloadable PDF resume.
- Replace generalized case-study language with approved public details.
- Add a custom domain.
- Add analytics after launch.
