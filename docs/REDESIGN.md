# Monochrome astronaut redesign

## Phase 0 — audit / content map
Baseline: `30b2dee`, branch `redesign/monochrome-astronaut`. React 18, React Router 6, Vite 5. Original source remains in git; KindleShell, StatusBar, NavigationMenu, PageTransition and original styles remain on disk.

| Existing route/content | New location |
| --- | --- |
| `/`: Allen Thomson, Software Engineer, introductory bio, portrait, engineering video | Hero and About panel; engineering video retained as an expandable original animation |
| `/`: all four featured projects | Selected work includes all six projects; `/portfolio` retains complete project library |
| `/`: four experience entries, expandable details | Home experience panel and `/about`, original ExperienceList |
| `/`: IEEE NFC paper, September 2025, conference, Bengaluru, submission ID 741, publication status, external link | Home research panel, exact content retained |
| `/`: About/Contact descriptive panels | Home About and Contact panels |
| `/about`: experience, two Christ University degrees, dates, focus areas, Life bio | Restyled `/about`, homepage links to full background |
| `/portfolio`: six projects, years, descriptions, tech, previews and all external links | Restyled project library, home project blocks |
| `/blog`: two posts, dates, reading time, excerpts, likes | Writing preview + original blog library |
| `/blog/:postId`: complete text, code, JSON highlighting, Mermaid diagrams, tables, pagination, progress, previous/next, likes | Original reader logic with new styles; font preference retained |
| `/forum`: Time 59, tags, likes, comments, Google sign-in/out, join interest | Building panel links to original forum |
| `/forum/:topicId`: discussion, live subscriptions, Time59Visualization, editing helpers, Google auth, joining email confirmation | Restyled original detail route |
| `/contact`: email, GitHub, LinkedIn, Netlify form + honeypot, success/error/local handling | Homepage CTA and original contact route |
| `*`: not found | Restyled existing fallback |

### Complete source inventory
- Pages: HomePage, AboutPage, PortfolioPage, BlogLibraryPage, BlogPostPage, ForumPage, ForumTopicPage, ContactPage, NotFoundPage.
- Components: KindleShell, NavigationMenu, StatusBar (clock/battery), PageTransition, SocialRail, SiteFooter, ExperienceList, ProjectLinkIcon (Sonno download confirmation modal), ProjectPreview, BlogLikeButton, Time59Project (math helpers + test), Time59Visualization (interactive simulation).
- Data: projects.js (Trash Buddy, Sonno Music Player, Attendance Tracking Mobile Application, Corpcon Backend Application, Food Delivery App, Automatic Billing Machine); workExperience.js (Unbxd, Netcore Cloud, two WebEngage roles); blogPosts.js (Redis streams/Kafka article, Test Blog); forumTopics.js (Project: Time 59); engineering/bridge images and MP4/WebM.
- Context/hooks: KindleContext theme/font scale persisted by useLocalStorage.
- Utilities: analytics, blogLikes, blogLikeStorage, forum, imageHelper, layoutShiftPrevention, renderInlineLinks, webVitals.
- Integrations: Firebase Authentication (Google popup/redirect), Firestore live likes/comments/interest, Google Analytics events and web vitals, Netlify Forms, Netlify redirects/headers. No credentials changed.
- Assets retained: allen.jpeg, allen1.jpeg, allen.webp, A.png, favicon.jpg, allenresume_27_08.pdf, Google verification HTML, robots.txt. Resume existed as a file but was not linked in active source; now available from the navigation.
- Links preserved: trashbuddy.in; Sonno Google Drive APK; github.com/Allono07/attendance_composable; corpcon.in; github.com/Allono07/restaurant_app_flutter; github.com/Allono07/autobillproject; IEEE document 11306945; mailto:allono.at@gmail.com; GitHub Allono07; LinkedIn allen-thomson-5b1309110; Instagram allen.thomson7 with existing query; LeetCode AllenThomson; all inline article links. Original links remain in their data/components unchanged.

### Portrait
User source: `/Users/allenthomson/Downloads/ChatGPT Image Sep 24, 2026, 10_47_04 PM.png`, 1091 × 1442, RGB, no alpha. Background removal into a separate asset proposed before hero layering; original must remain unmodified. Eye bar calibration approximately x=15.6%, y=42.65%, w=68.8%, h=10.47%.

### Creative reference
https://www.trevornoah.com/ was reviewed for large personality-led typography, prominent navigation, sectional pacing and scroll composition only. No code, imagery or text is copied.

### Dependencies
Only `three`, `gsap` and `lenis` added. Direct Three.js keeps the procedural model and explicit disposal straightforward without adding React renderer dependencies.

## Checkpoints
- Phase 0: source audit and map recorded.
- Phase 1: pending.
- Phase 2: pending.
- Phase 3: pending.
- Phase 4: pending.
- Phase 5: pending.
