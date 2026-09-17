# Portfolio Design System

## 1. Design Concept

### Core Concept

**Curiosity**

Portfolio ini bukan sekadar website untuk menampilkan CV atau daftar project.

Konsep utamanya adalah membawa pengunjung masuk ke sebuah **developer workspace** yang merepresentasikan cara berpikir, proses eksplorasi, dan karya Muhar.

Workspace dibuat sedikit messy untuk merepresentasikan:

> Creating systems and random chaos.

"Chaos" bukan berarti desain berantakan tanpa tujuan.

Chaos adalah kumpulan ide, tools, experiments, dan systems yang kemudian dikembangkan menjadi sebuah karya.

---

# 2. Design Direction

Visual direction:

- Modern exhibition
- Editorial
- Cinematic
- Experimental
- Technology-focused
- Minimal
- Slightly chaotic
- Premium
- Personal

Inspirasi:

- Modern exhibition
- Museum installation
- Developer workspace
- Editorial photography
- Product showcase
- Digital interface
- Flat illustration

Website harus terasa seperti sebuah **experience**, bukan sekadar halaman portfolio biasa.

---

## Avoid

Jangan menggunakan:

- Generic developer portfolio
- Template-looking website
- Dashboard aesthetic
- Excessive glassmorphism
- Excessive gradients
- Excessive animations
- AI-generated-looking UI
- Excessive floating elements
- Overly futuristic cyberpunk aesthetic
- Random 3D objects
- Excessive particles
- Excessive neon colors
- Animation hanya untuk dekorasi

Website harus terasa intentional.

---

# 3. Core Story

Portfolio memiliki dua dunia utama:

```text
PHYSICAL WORLD
Developer Workspace
        ↓
     SCROLL
        ↓
   CAMERA ZOOM
        ↓
   MACBOOK SCREEN
        ↓
DIGITAL WORLD
Portfolio Experience
Physical World

Represented by:

Messy developer workspace
MacBook
Monitor
Phones
Desk objects
2D JPEG illustration
Digital World

Represented by:

HTML interface
Portfolio content
Flat illustration
GSAP interactions
Digital visual language

MacBook menjadi gateway antara dua dunia.

4. Hero Experience

Hero merupakan cinematic introduction.

Pengunjung pertama kali melihat sebuah developer workspace.

MacBook menjadi primary focal point.

Pengunjung kemudian scroll.

Scroll mengontrol camera movement menggunakan GSAP + ScrollTrigger.

Camera bergerak menuju MacBook display.

Ketika camera sudah cukup dekat:

Physical Workspace
        ↓
MacBook
        ↓
MacBook Display
        ↓
Digital Portfolio

Digital portfolio kemudian mengambil alih viewport.

5. Scene 01 — Workspace
Purpose

Scene 01 merepresentasikan physical workspace milik seorang developer.

Scene ini bukan halaman portfolio biasa.

Ia berfungsi sebagai establishing shot.

Visual Asset

Scene 01 menggunakan 2D JPEG.

Asset:

/public/hero section.jpeg

Aspect ratio:

16:9

Scene menggambarkan messy developer workspace.

Elemen utama:

MacBook
Monitor
Android phone
iPhone
Desk
Developer-related objects

MacBook adalah focal point utama.

6. Scene 01 Initial State

Ketika halaman pertama kali dibuka:

BLACK BACKGROUND
        ↓
SCENE 01
        ↓
MESSY WORKSPACE

Requirements:

Hero background solid black.
Scene 1 visible.
Scene 2 hidden.
No layout shift.
No flash.
No duplicated typography.
No incorrect GSAP initial state.
No sudden position jump.
No loading spinner.

Initial rendering harus deterministic.

7. Hero Background

Hero section menggunakan:

#000000

sebagai background utama.

Background harus benar-benar solid black.

Jangan menggunakan JPEG sebagai background Hero.

Struktur:

Black Hero
    └── Scene 1 Image

Black background harus tetap stabil sepanjang transition.

8. Scene 01 Cinematic Treatment

Scene 01 merupakan JPEG sehingga perlu visual treatment ringan agar tidak terasa seperti gambar statis yang ditempel di website.

Treatment harus subtle.

Tidak boleh mengubah karakter utama image.

8.1 Vignette

Gunakan vignette ringan pada Scene 01.

Purpose:

Menambah depth.
Membuat scene terasa cinematic.
Mengarahkan perhatian ke MacBook.
Mengurangi kesan flat image.

Rules:

Sangat subtle.
Tidak membuat image terlalu gelap.
MacBook tetap jelas.
Tidak memengaruhi Scene 02.
Fade out ketika transition berlangsung.
8.2 Film Grain

Gunakan film grain sangat subtle.

Purpose:

Memberikan photographic feel.
Membuat scene terasa seperti exhibition frame.
Mengurangi kesan raw JPEG.

Rules:

Sangat halus.
Tidak boleh terlihat seperti noise kasar.
Tidak menggunakan animated noise berlebihan.
Tidak mengganggu readability.
Fade out sebelum Scene 02 fully visible.
9. Scene 01 Label

Scene 01 dapat memiliki small editorial label.

Example:

SCENE 01
WORKSPACE

Purpose:

Membuat opening terasa seperti sebuah exhibition frame.

Style:

Small
Minimal
Monochrome
Editorial
Quiet
Away from MacBook focal point

Jangan membuatnya menjadi:

Badge
Card
Pill
Navbar
CTA
Large heading

Label merupakan bagian dari scene.

Label Animation

Initial:

visible

Ketika user mulai scroll:

fade out
+
subtle upward movement

Label harus sudah hilang ketika camera mulai fokus penuh ke MacBook.

Animation harus dikontrol oleh GSAP timeline.

Jangan menggunakan:

setTimeout()

sebagai workaround.

10. Hero Typography

Primary identity:

MUHAR

Primary statement:

Creating systems and random chaos.

Statement ini menjadi conceptual identity portfolio.

Typography Principle

Muhar tidak harus dikunci dengan job title seperti:

Fullstack Developer
Frontend Developer
Software Engineer

Portfolio harus memberikan ruang untuk menunjukkan versatility.

Hero statement lebih penting daripada job title.

11. Scene 01 → Scene 02 Transition

Transition merupakan primary interaction Hero.

Technology:

GSAP
ScrollTrigger

Transition harus terasa seperti camera push-in.

Bukan:

JPEG A
↓
crossfade
↓
JPEG B

Tetapi:

Workspace
↓
Camera moves forward
↓
MacBook becomes dominant
↓
Camera enters display
↓
Digital world appears
12. ScrollTrigger Configuration

Current configuration:

start: "top top"
end: "+=200%"
pin: true
scrub: 1

Hero pinned selama transition.

Scroll position mengontrol progress animation.

Concept:

Scroll Progress

0.0 ─────────────────────────────── 1.0

Workspace                         Screen
13. Scene 01 Zoom

Initial:

scale: 1

Final:

scale: 5.2

Current transform origin:

transformOrigin: "50% 39%"

Transform origin diarahkan ke area MacBook display.

Tujuannya agar scaling terasa seperti camera movement menuju screen.

14. Scene 02 — Digital Screen

Asset transition:

/public/hero-next-frame.jpg

Resolution:

2752 × 1548

Scene 02 merepresentasikan close-up MacBook display.

Scene 02 adalah gateway menuju digital portfolio.

15. Scene 02 Initial State

Scene 2 harus hidden ketika page pertama kali dibuka.

Initial:

scale: 0.92
opacity: 0

Final:

scale: 1
opacity: 1

Scene 2 hanya mulai muncul ketika camera sudah cukup dekat dengan MacBook.

16. Scene 02 Fade Timing

Scene 02 tidak boleh muncul terlalu awal.

Timing harus dapat diatur dengan constants yang jelas.

Contoh:

const SCENE2_FADE_START = 0.55;
const SCENE2_FADE_END = 0.85;

Interpretasi:

0.0
│
│ Camera starts
│
0.5
│
│ Camera approaching MacBook
│
0.55
│
│ Scene 2 starts appearing
│
0.85
│
│ Scene 2 fully visible
│
1.0

Nilai harus mudah diubah untuk visual tuning.

17. Scene 01 Fade Out

Scene 01 harus menghilang ketika camera sudah sangat dekat dengan MacBook.

Scene 01 tidak boleh fade out terlalu cepat.

Target visual:

Workspace
     ↓
MacBook gets closer
     ↓
MacBook fills viewport
     ↓
Scene 1 disappears
     ↓
Digital screen takes over

Transition harus terasa continuous.

18. Scene 02 HTML Interface

Setelah masuk ke MacBook screen, portfolio mulai menjadi actual digital interface.

Tujuan jangka panjang:

MacBook Screen
      ↓
HTML Interface
      ↓
Portfolio Content

Typography dan UI digital sebaiknya menggunakan HTML/CSS.

Jangan menjadikan JPEG sebagai permanent UI.

JPEG digunakan sebagai transition frame / visual bridge.

19. Digital World

Scene 02 merupakan awal dari digital world.

Digital world dapat memiliki karakter visual yang berbeda dari physical workspace.

Physical world:

Messy
Physical
Editorial
Photographic

Digital world:

Structured
Interactive
Experimental
Illustrative
Systematic

Perbedaan tersebut membantu pengunjung memahami bahwa mereka sudah masuk ke "dunia" portfolio.

20. Flat Illustration
Placement

Flat illustration tidak muncul pada Scene 01.

Flat illustration hanya muncul setelah camera masuk ke MacBook screen dan Scene 02 sudah mengambil alih viewport.

Flow:

Scene 01
Physical Workspace
        ↓
GSAP Camera Zoom
        ↓
MacBook Screen
        ↓
Scene 02
Digital World
        ↓
Flat Illustration
21. Flat Illustration Purpose

Flat illustration digunakan untuk memberikan personality pada digital world.

Possible themes:

Systems
Ideas
Experiments
Technology
Projects
Curiosity
Random chaos

Illustration harus memiliki hubungan dengan content.

Jangan menambahkan illustration hanya sebagai decoration.

22. Flat Illustration Style

Visual style:

Flat illustration
2D
Clean
Minimal
Editorial
Slightly playful
Modern
Technology-oriented

Avoid:

3D rendering
Photorealism
Excessive gradients
Excessive colors
Generic AI illustration style
Excessive cartoon characters

Illustration harus terasa sebagai bagian dari digital portfolio environment.

23. Flat Illustration Entrance

Flat illustration muncul setelah Scene 02 stabil.

Sequence:

Camera enters MacBook
        ↓
Scene 02 appears
        ↓
Digital interface stabilizes
        ↓
Flat illustration appears
        ↓
Illustration settles into position

Jangan membuat illustration muncul ketika camera masih jauh dari MacBook.

Initial State
opacity: 0

Possible initial transform:

y: 20
scale: 0.96

Final:

opacity: 1
y: 0
scale: 1

Contoh:

gsap.fromTo(
  illustration,
  {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
  }
);
24. Flat Illustration Timing

Illustration memiliki timing terpisah dari primary camera transition.

Example:

const ILLUSTRATION_START = 0.9;
const ILLUSTRATION_END = 1.0;

Concept:

0.00
│
│ Camera zoom
│
0.50
│
│ MacBook approaching
│
0.80
│
│ Scene 02
│
0.90
│
│ Illustration starts
│
1.00
│
│ Illustration visible

Timing harus mudah di-adjust.

25. Flat Illustration Motion

Animation harus subtle.

Possible animation:

opacity
translate
scale
subtle rotation
clip-path reveal
subtle parallax

Motion harus terasa seperti illustration masuk ke digital environment.

Jangan membuat illustration:

bouncing
spinning continuously
floating aggressively
moving randomly

Setelah masuk ke posisi final, illustration dapat static.

Jika menggunakan idle animation, harus sangat subtle.

26. Visual Hierarchy

Priority:

1. MacBook / Main Content
2. Digital Portfolio Interface
3. Flat Illustration
4. Supporting Details

Flat illustration tidak boleh mengambil perhatian dari content utama.

Illustration adalah supporting visual.

27. Color Direction

Hero base:

#000000

Primary palette:

Black
White
Off-white
Charcoal
Neutral gray

Accent color dapat digunakan di digital world.

Namun jangan menggunakan terlalu banyak warna.

Color harus membantu hierarchy.

28. Motion Philosophy

Motion harus memiliki tujuan.

Primary motion:

Scroll
 ↓
Camera movement
 ↓
Transition
 ↓
Digital reveal
 ↓
Content interaction

Animation tidak boleh menjadi sekadar visual decoration.

Prioritas:

Story
>
Clarity
>
Interaction
>
Visual Effects
29. Three.js

Three.js tidak digunakan pada current Hero.

Scene 01 tetap 2D.

Current technology:

2D Image
+
HTML/CSS
+
GSAP
+
ScrollTrigger

Three.js hanya digunakan jika nantinya ada interaction yang memang membutuhkan 3D.

Jangan menggunakan Three.js hanya karena ingin terlihat advanced.

30. Responsive Design

Hero harus tetap mempertahankan MacBook sebagai focal point pada berbagai ukuran layar.

Requirements:

MacBook tetap menjadi zoom target.
Zoom tidak keluar dari intended composition.
No horizontal overflow.
Hero height stable.
Scene 2 aligned dengan viewport.
No layout shift.

Mobile tidak boleh hanya menjadi versi kecil dari desktop.

Jika diperlukan, composition dan camera target dapat disesuaikan untuk mobile.

31. Accessibility

Respect:

prefers-reduced-motion

Jika user mengaktifkan reduced motion:

Jangan memaksa full scroll animation.
Gunakan transition yang lebih sederhana.
Content tetap accessible.
Portfolio tidak boleh bergantung sepenuhnya pada animation.
32. Technical Principles

Technology:

Next.js
TypeScript
Tailwind CSS
GSAP
ScrollTrigger

Hero-related animation dapat berada di:

components/sections/Hero.tsx

Jika complexity meningkat, animation dapat dipisahkan menjadi dedicated hook/component.

GSAP React Rules

Gunakan proper React cleanup.

Prefer:

gsap.context()

atau pattern GSAP yang sesuai untuk lifecycle React.

Pastikan ScrollTrigger dibersihkan ketika component unmount.

Jangan menggunakan:

setTimeout()

untuk memperbaiki animation initialization.

Jangan menggunakan artificial delay sebagai workaround untuk refresh glitch.

33. Initial Load Requirements

Saat refresh:

BLACK BACKGROUND
        ↓
SCENE 01
        ↓
Cinematic treatment
        ↓
Workspace

Tidak boleh terjadi:

Scene 2 flash
Duplicate text
Unstyled content flash
Image jump
Layout shift
Incorrect transform
ScrollTrigger jump

Initial state harus deterministic sebelum animation berjalan.

34. Layer Structure
Scene 01
Black Hero Background
        ↓
Scene 01 JPEG
        ↓
Vignette
        ↓
Film Grain
        ↓
SCENE 01 / WORKSPACE Label
Scene 02
Digital Background
        ↓
Scene 02 / Screen
        ↓
HTML Portfolio Interface
        ↓
Flat Illustration
        ↓
Interactive Elements

Scene 01 visual effects tidak boleh ikut memengaruhi Scene 02.

35. Hero Success Criteria
Initial View

Pengunjung melihat:

Cinematic developer workspace
        +
Subtle vignette
        +
Subtle grain
        +
Small SCENE 01 / WORKSPACE label

Tidak terasa seperti raw JPEG.

Scroll

Pengunjung melakukan scroll:

Workspace pinned
        ↓
Camera pushes toward MacBook
        ↓
MacBook grows
        ↓
Scene 01 treatment disappears
        ↓
MacBook screen dominates
        ↓
Digital screen appears
Digital World

Setelah masuk ke screen:

Digital interface
        ↓
Portfolio content
        ↓
Flat illustration appears
        ↓
Digital experience continues
36. Final Experience

Target emotional flow:

"Ini meja kerja seorang developer."
        ↓
"MacBook-nya jadi fokus."
        ↓
"Oh, kita masuk ke dalam screen."
        ↓
"Ini ternyata dunia portfolio-nya."
        ↓
"Dan di dalamnya ada systems, experiments,
projects, dan random chaos."

The website should feel like an experience rather than a static portfolio.

37. Core Design Principle

The portfolio should always prioritize:

Story > Visual Effects

Clarity > Complexity

Intentional Interaction > Decoration

Personality > Generic Portfolio

Experience > Template

The final website should feel like:

A developer built an environment to present his work.

Not:

A developer put his work inside a website template.


Ini sudah jadi **source of truth** untuk konsep yang kita sepakati sekarang. Yang paling penting, posisi flat illustration sudah dikunci: **bukan di meja awal, tapi baru muncul setelah masuk ke MacBook/digital world.**