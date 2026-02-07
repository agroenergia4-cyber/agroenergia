# Bilingual Support Reference Guide

## How the Language System Works

Your website has full bilingual support for English (EN) and Portuguese (PT). The language switching is handled automatically by JavaScript.

## Language Toggle Button

Located in the top-right corner of every page:
- **EN button** - Switches to English
- **PT button** - Switches to Portuguese

The active language is highlighted in green.

## How Content is Translated

Every translatable element has two attributes:
- `data-en="English Text"` - English version
- `data-pt="Portuguese Text"` - Portuguese version

Example:
```html
<h2 data-en="Our Solutions" data-pt="Nossas Soluções">
    Our Solutions
</h2>
```

## Sections with Bilingual Support

### Index.html (Main Page)
✅ Navigation menu
✅ Hero section (title, subtitle, buttons)
✅ Hero statistics
✅ About section (all text)
✅ Solutions section (titles, descriptions, features)
✅ Projects section
✅ Services section
✅ Impact section
✅ SDG section (all titles and descriptions)
✅ Contact section (all labels and form fields)
✅ Footer

### green-poultry.html (Project Page)
✅ Navigation menu
✅ Hero section
✅ Overview section
✅ Technology section
✅ Sustainability section
✅ Impact section
✅ Gallery captions
✅ Partners section
✅ Awards section
✅ Testimonials
✅ Call-to-action section
✅ Footer

## Testing the Language Switch

1. Open the website in a browser
2. Click the **PT** button in the top-right
3. All text should instantly switch to Portuguese
4. Click **EN** to switch back to English
5. The preference is saved in the browser

## Adding New Bilingual Content

If you need to add new text that should be translatable:

1. Add both `data-en` and `data-pt` attributes
2. Put the default language (English) as the actual text content
3. The JavaScript will automatically handle the translation

Example:
```html
<p data-en="This is English text" data-pt="Este é o texto em português">
    This is English text
</p>
```

## Form Field Placeholders

Form fields also support bilingual placeholders:

```html
<input type="text" data-en="Name" data-pt="Nome">
```

The placeholder text will change when the language is switched.

## Current Language Coverage

**100% Bilingual Support:**
- All headings and titles
- All body text
- All buttons and links
- All form labels
- All section tags
- All statistics labels
- All navigation items
- All footer content
- All image alt text (where applicable)
- All tooltips and overlays

## Language Persistence

The selected language is saved in the browser's localStorage, so users' language preference is remembered even after they close and reopen the website.

## Troubleshooting

**If text doesn't translate:**
1. Check that both `data-en` and `data-pt` attributes are present
2. Make sure the attributes are on the correct element
3. Check browser console for JavaScript errors
4. Clear browser cache and reload

**Common Issues:**
- Missing `data-pt` attribute → Element won't translate
- Typo in attribute name → Translation won't work
- JavaScript not loaded → Toggle won't function

## Adding More Languages

To add a third language (e.g., French):

1. Add language button to HTML:
```html
<button class="lang-btn" data-lang="fr">FR</button>
```

2. Add `data-fr` attributes to all translatable elements:
```html
<h2 data-en="Solutions" data-pt="Soluções" data-fr="Solutions">
```

3. The JavaScript will automatically support it!

---

**Note:** The bilingual system is already fully implemented and working. You don't need to do anything except add your images and verify the translations are correct for your needs.
