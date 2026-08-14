import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// EmailJS is loaded via <script> in index.html. Declared here so TS won't complain.
declare const emailjs: any;

interface StackLayer {
  label: string;
  detail: string;
  depth: number;
}

interface SkillGroup {
  title: string;
  items: string[];
}

interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
  current?: boolean;
}

interface EducationItem {
  degree: string;
  school: string;
  year: string;
  score: string;
}

interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  credential?: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: string;
  percentage: number;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface Toast {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // ── Personal info ────────────────────────────────────────────────────────
  readonly name     = 'Ashikur Rahman';
  readonly title    = 'Full Stack Web Developer';
  readonly location = 'Mirpur, Dhaka, Bangladesh';

  // FIXED: was '/src/assets/Ashikur 300.jpg'
  // - "src/" is a source-only folder; Angular copies its contents to "assets/" at build time,
  //   so the browser must request "assets/...", never "/src/assets/...".
  // - The space in the filename was also renamed to avoid URL-encoding issues.
  // Place the actual file at: src/assets/profile.jpg
  readonly profileImage = 'assets/profile.jpg';

  readonly email    = 'ashikurr255@gmail.com';
  readonly phone    = '01708-588330';
  readonly linkedin = 'https://www.linkedin.com/in/ashikur-rahman-134300159';
  readonly github   = 'https://github.com/ashikur-255';

  // FIXED: was '/src/assets/Ashikur_CV.pdf'
  // Place the actual file at: src/assets/Ashikur_CV.pdf
  readonly resumeUrl = 'assets/Ashikur_CV.pdf';

  // ── EmailJS config ───────────────────────────────────────────────────────
  private readonly emailjsConfig = {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  };

  // ── Theme ────────────────────────────────────────────────────────────────
  isDarkMode = true;

  // ── Stats ────────────────────────────────────────────────────────────────
  readonly statsList = [
    { key: 'Projects',     value: 7 },
    { key: 'Experience',   value: 1  },
    { key: 'Clients',      value: 0  },
    { key: 'Certificates', value: 1  },
  ];

  // ── Bio ──────────────────────────────────────────────────────────────────
  readonly bio =
    'Full Stack Web Developer with hands-on experience designing, building, and ' +
    'maintaining responsive web applications. I work across the stack — from C# and ' +
    'ASP.NET Core on the server to clean, usable interfaces on the client — with a ' +
    'focus on solving real problems and shipping software that holds up in production.';

  // ── Typing animation ─────────────────────────────────────────────────────
  readonly roles = [
    'Full Stack Web Developer',
    'ASP.NET Core Specialist',
    'C# Developer',
    'UI/UX Enthusiast',
    'Debugger',
  ];
  currentRoleIndex = 0;
  displayedRole    = '';
  isDeleting       = false;
  private typingTimeout: ReturnType<typeof setTimeout> | null = null;
  private prefersReducedMotion = false;

  // ── UI state ─────────────────────────────────────────────────────────────
  menuOpen      = false;
  currentYear   = new Date().getFullYear();
  showBackToTop = false;
  scrollProgress = 0;
  activeSection  = '';
  showResumeModal = false;

  readonly navLinks = [
    { label: 'About',          href: '#about'          },
    { label: 'Skills',         href: '#skills'         },
    { label: 'Experience',     href: '#experience'     },
    { label: 'Projects',       href: '#projects'       },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact',        href: '#contact'        },
  ];

  // ── Stack visual ─────────────────────────────────────────────────────────
 stackLayers = [
  {
    label: 'Frontend',
    detail: 'Angular · React · TypeScript · HTML · CSS'
  },
  {
    label: 'Backend',
    detail: 'ASP.NET Core · C# · REST API · JWT'
  },
  {
    label: 'Database',
    detail: 'SQL Server · Entity Framework Core'
  },
  {
    label: 'Architecture',
    detail: 'Clean Architecture · MVC · Repository Pattern'
  },
  {
    label: 'Tools & DevOps',
    detail: 'Git · GitHub · Swagger · Visual Studio'
  }
];

  // ── Skills ───────────────────────────────────────────────────────────────
  readonly skillGroups: SkillGroup[] = [
    { title: 'Backend',  items: ['ASP.NET Core MVC','ASP.NET Core Web API', 'C#', 'API Integration', 'Authentication','Role Base Authorization'] },
    { title: 'Frontend', items: ['Angular','React','HTML', 'CSS', 'Bootstrap','Tailwind CSS', 'JavaScript'] },
    { title: 'Data',     items: ['SQL Server','MongoDB' ,'Database Management'] },
    { title: 'Practice', items: ['Problem-Solving', 'Debugging', 'Team Collaboration'] },
  ];

  readonly detailedSkills = [
    { name: 'ASP.NET Core MVC', level: 85 },
    { name: 'ASP.NET Core Web API', level: 85 },
    { name: 'C#',               level: 80 },
    { name: 'SQL Server',       level: 80 },
    { name: 'MongoDB',          level: 80 },
    { name: 'Angular',          level: 85 },
    { name: 'React',            level: 90 },
    { name: 'JavaScript',       level: 70 },
    { name: 'Node.js',          level: 80 },
    { name: 'Bootstrap',        level: 85 },
    { name: 'HTML & CSS',       level: 85 },
    { name: 'Tailwind CSS',     level: 85 },
  ];

  // ── Experience ───────────────────────────────────────────────────────────
  readonly experience: Experience[] = [
    {
      role:    'Full Stack Web Developer',
      company: 'Islamic Development Bank (BISEW)',
      period:  '2025 — Present',
      current: true,
      points: [
        'Develop and maintain responsive web applications and software solutions.',
        'Collaborate with teams to design and implement user-focused features.',
        'Manage databases, APIs, and application performance optimization.',
        'Troubleshoot, debug, and improve existing systems efficiently.',
        'Maintain project documentation and ensure high-quality code standards.',
      ],
    },
    {
      role:    'Computer Operator',
      company: 'Labaid Cardiac Hospital',
      period:  '2022 — 2023',
      points: [
        'Maintained and updated patient records, charts, and hospital documentation.',
        'Entered, processed, and managed patient data in hospital management systems.',
        'Prepared discharge summaries, reports, and operational documents.',
        'Ensured data accuracy, confidentiality, and smooth system operation.',
      ],
    },
  ];


  // ── Education ────────────────────────────────────────────────────────────
  readonly education: EducationItem[] = [
    { degree: 'Bachelor of Arts (B.A) in English', school: 'Northern University Bangladesh',  year: '2022', score: 'CGPA 2.84' },
    { degree: 'Higher Secondary Certificate',      school: 'Shagar Khaly Ideal College',       year: '2015', score: 'GPA 3.25'  },
    { degree: 'Secondary School Certificate',      school: 'Jhaudia High School',              year: '2013', score: 'GPA 3.75'  },
  ];

  // ── Projects ─────────────────────────────────────────────────────────────
  // NOTE: project images below point to "assets/projects/...". Create that
  // subfolder inside src/assets/ and drop matching screenshots in, or the
  // built-in onImageError fallback will render a placeholder card instead
  // (this is intentional graceful degradation, not a bug).
  readonly projects: Project[] = [
    {
      name:        'DoctorAppointment',
      tagline:     'Healthcare booking platform',
      description: 'A web application for scheduling doctor appointments, managing patient and doctor records, and streamlining hospital front-desk workflows.',
      tech:  ['ASP.NET Core MVC', 'C#', 'SQL Server', 'Bootstrap'],
      link:  'https://github.com/ashikur-255/Doctor-Appoinment-System-',
      image: 'assets/projects/doctorappointment.jpg',
    },
    {
      name:        'Ecommerce',
      tagline:     'Online storefront & admin panel',
      description: 'A full stack e-commerce application covering product catalogue, cart, checkout, and an admin panel for managing inventory and orders.',
      tech:  ['ASP.NET Core MVC', 'C#', 'SQL Server', 'JavaScript'],
      link:  'https://github.com/ashikur-255/Ecommerce',
      image: 'assets/projects/ecommerce.jpg',
    },
    {
      name:        'NewsPortal',
      tagline:     'Content publishing system',
      description: 'A news publishing platform with category-based articles, an editor dashboard, and role-based access for authors and administrators.',
      tech:  ['ASP.NET Core MVC', 'C#', 'SQL Server', 'API Integration'],
      link:  'https://github.com/ashikur-255/Express-News-Portal',
      image: 'assets/projects/newsportal.jpg',
    },
  ];

  // ── Certifications ───────────────────────────────────────────────────────
  readonly certifications: Certification[] = [
    { name: 'Full Stack Web Development',     issuer: 'IsDB-BISEW',     year: '2025' },
  ];

  // ── Achievements ─────────────────────────────────────────────────────────
  readonly achievements: Achievement[] = [
    { icon: '⏱', title: '1+ Years Experience',   description: 'Professional software development experience', percentage: 85 },
    { icon: '🚀', title: '7+ Projects Delivered', description: 'Successfully completed full stack projects', percentage: 90 },
    { icon: '👥', title: 'Team Leadership',       description: 'Led development teams in multiple projects', percentage: 75 },
    { icon: '📚', title: 'Continuous Learning',   description: 'Always exploring new technologies and best practices', percentage: 95 },
  ];

  // ── Contact form ─────────────────────────────────────────────────────────
  contactForm   = { name: '', email: '', subject: '', message: '' };
  formErrors: ContactFormErrors = {};
  formSubmitted = false;
  isSubmitting  = false;

  // ── Toast ────────────────────────────────────────────────────────────────
  toast: Toast = { message: '', type: 'success', visible: false };
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  // ── Particles ────────────────────────────────────────────────────────────
  particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
  private animationFrameId: number | null = null;

  // ── Reveal observer ──────────────────────────────────────────────────────
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;

  constructor() {
    this.initParticles();
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    this.isDarkMode =
      saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme();

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) {
      this.displayedRole = this.roles[0];
    } else {
      this.typeRole();
    }

    this.initEmailJs();
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          entry.target.classList.add('in-view');
          this.observer?.unobserve(entry.target);

          if (entry.target.classList.contains('stats-trigger')) {
            this.animateCounters();
          }
        }
      },
      { threshold: 0.15 }
    );

    this.revealEls.forEach((el) => this.observer?.observe(el.nativeElement));

    if (!this.prefersReducedMotion) {
      this.startParticleLoop();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
  }

  // ── Theme ────────────────────────────────────────────────────────────────
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme(): void {
    document.documentElement.style.colorScheme = this.isDarkMode ? 'dark' : 'light';
  }

  // ── Typing animation ─────────────────────────────────────────────────────
  private typeRole(): void {
    const target = this.roles[this.currentRoleIndex];

    if (!this.isDeleting) {
      if (this.displayedRole.length < target.length) {
        this.displayedRole += target[this.displayedRole.length];
        this.typingTimeout = setTimeout(() => this.typeRole(), 100);
      } else {
        this.typingTimeout = setTimeout(() => {
          this.isDeleting = true;
          this.typeRole();
        }, 1500);
      }
    } else {
      if (this.displayedRole.length > 0) {
        this.displayedRole = this.displayedRole.slice(0, -1);
        this.typingTimeout = setTimeout(() => this.typeRole(), 50);
      } else {
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.typingTimeout = setTimeout(() => this.typeRole(), 100);
      }
    }
  }

  // ── Counter animation ──────────────────────────────────────────────────
  private animateCounters(): void {
    const counters = document.querySelectorAll<HTMLElement>('.stat-number[data-target]');

    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') ?? '0', 10);

      if (this.prefersReducedMotion) {
        el.textContent = target.toString();
        return;
      }

      const duration  = 1800;
      const frameRate = 60;
      const totalFrames = (duration / 1000) * frameRate;
      let frame = 0;

      const tick = () => {
        frame++;
        const progress = frame / totalFrames;
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toString();

        if (frame < totalFrames) requestAnimationFrame(tick);
        else el.textContent = target.toString();
      };

      requestAnimationFrame(tick);
    });
  }

  // ── Particles ────────────────────────────────────────────────────────────
  private initParticles(): void {
    for (let i = 0; i < 28; i++) {
      this.particles.push({
        x:       Math.random() * 100,
        y:       Math.random() * 100,
        size:    Math.random() * 3 + 1,
        speed:   Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  private startParticleLoop(): void {
    const tick = () => {
      for (const p of this.particles) {
        p.y += p.speed * 0.04;
        if (p.y > 100) { p.y = 0; p.x = Math.random() * 100; }
      }
      this.animationFrameId = requestAnimationFrame(tick);
    };
    this.animationFrameId = requestAnimationFrame(tick);
  }

  // ── Scroll ───────────────────────────────────────────────────────────────
  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    this.showBackToTop  = scrollTop > 300;
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const offset = 140;
    let current = '';
    for (const link of this.navLinks) {
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top - offset <= 0) {
        current = id;
      }
    }
    this.activeSection = current;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: this.prefersReducedMotion ? 'auto' : 'smooth' });
  }

  // ── Nav ──────────────────────────────────────────────────────────────────
  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu():  void { this.menuOpen = false;          }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showResumeModal) this.showResumeModal = false;
    if (this.menuOpen) this.menuOpen = false;
  }

  // ── Resume ───────────────────────────────────────────────────────────────
  downloadResume(): void {
    // Use the relative path directly — it resolves correctly against
    // whatever <base href> the app is served from (root or subpath),
    // unlike `new URL(url, document.baseURI)` with a leading slash.
    const link = document.createElement('a');
    link.href = this.resumeUrl;
    link.download = 'Ashikur_Rahman_CV.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    this.showToast('CV download started.', 'success');
  }

  toggleResumeModal(): void {
    this.showResumeModal = !this.showResumeModal;
  }

  // ── Copy to clipboard ────────────────────────────────────────────────────
  copyToClipboard(text: string, label: string): void {
    if (!navigator.clipboard) {
      this.showToast(`Copy isn't supported in this browser`, 'error');
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => this.showToast(`${label} copied to clipboard`, 'success'))
      .catch(() => this.showToast(`Couldn't copy ${label}`, 'error'));
  }

  // ── Image fallback ───────────────────────────────────────────────────────
  onImageError(event: Event, label = 'Portfolio image'): void {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallbackApplied'] === 'true') return;

    img.dataset['fallbackApplied'] = 'true';
    img.onerror = null;

    const safeLabel = label.replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char] ?? char));

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      <defs><linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#ec4899"/>
      </linearGradient></defs>
      <rect width="800" height="500" fill="#0f0b1e"/>
      <circle cx="400" cy="190" r="80" fill="url(#g)" opacity=".9"/>
      <text x="400" y="205" text-anchor="middle" font-size="72" fill="white" font-family="Arial">AR</text>
      <text x="400" y="350" text-anchor="middle" font-size="28" fill="#f1eeff" font-family="Arial">${safeLabel}</text>
      <text x="400" y="390" text-anchor="middle" font-size="18" fill="#b8b0d4" font-family="Arial">Ashikur Rahman · Full Stack Developer</text>
    </svg>`;
    img.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    img.style.display = 'block';
  }

  // ── Toast ────────────────────────────────────────────────────────────────
  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toast = { message, type, visible: true };
    this.toastTimeout = setTimeout(() => (this.toast = { ...this.toast, visible: false }), 4000);
  }

  // ── Contact form ─────────────────────────────────────────────────────────
  private initEmailJs(): void {
    try {
      if (typeof emailjs !== 'undefined' && !this.emailjsConfig.publicKey.startsWith('YOUR_')) {
        emailjs.init({ publicKey: this.emailjsConfig.publicKey });
      }
    } catch {
      // EmailJS script not present — form will fall back to mailto automatically.
    }
  }

  private validateForm(): ContactFormErrors {
    const errors: ContactFormErrors = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.contactForm.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!this.contactForm.email.trim() || !emailRe.test(this.contactForm.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!this.contactForm.message.trim() || this.contactForm.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters.';
    }
    return errors;
  }

  clearFieldError(field: keyof ContactFormErrors): void {
    if (this.formErrors[field]) {
      const { [field]: _removed, ...rest } = this.formErrors;
      this.formErrors = rest;
    }
  }

  submitForm(): void {
    this.formErrors = this.validateForm();
    if (Object.keys(this.formErrors).length > 0) {
      this.showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    this.isSubmitting = true;
    const emailjsReady =
      typeof emailjs !== 'undefined' && !this.emailjsConfig.serviceId.startsWith('YOUR_');

    if (emailjsReady) {
      emailjs
        .send(this.emailjsConfig.serviceId, this.emailjsConfig.templateId, {
          from_name: this.contactForm.name,
          from_email: this.contactForm.email,
          subject: this.contactForm.subject || 'New portfolio contact',
          message: this.contactForm.message,
          to_email: this.email,
        })
        .then(() => {
          this.isSubmitting = false;
          this.formSubmitted = true;
          this.showToast('Message sent — I\'ll get back to you soon!', 'success');
          this.resetFormAfterDelay();
        })
        .catch((err: unknown) => {
          console.error('EmailJS error:', err);
          this.isSubmitting = false;
          this.showToast('Sending failed — opening your email client instead.', 'error');
          this.sendViaMailto();
        });
    } else {
      this.isSubmitting = false;
      this.sendViaMailto();
    }
  }

  private sendViaMailto(): void {
    const subject = encodeURIComponent(
      this.contactForm.subject || `Portfolio inquiry from ${this.contactForm.name}`
    );
    const body = encodeURIComponent(
      `${this.contactForm.message}\n\n— ${this.contactForm.name} (${this.contactForm.email})`
    );
    window.open(`mailto:${this.email}?subject=${subject}&body=${body}`, '_self');
    this.formSubmitted = true;
    this.resetFormAfterDelay();
  }

  private resetFormAfterDelay(): void {
    setTimeout(() => {
      this.formSubmitted = false;
      this.contactForm = { name: '', email: '', subject: '', message: '' };
      this.formErrors = {};
    }, 3000);
  }
}
