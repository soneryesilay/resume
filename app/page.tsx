"use client"

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter, Youtube, Github, Linkedin } from "lucide-react"
import { ThemeToggle } from "../components/theme-toggle"
import MobileMenu from "@/components/MobileMenu"
import { TypeAnimation } from 'react-type-animation'
import { useState, useEffect } from 'react'
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollInView, useSmoothScroll, useParallax, useLoadingState } from "@/hooks/useAnimations"
import { LoadingAnimation } from "@/components/LoadingAnimation"

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const { isLoading } = useLoadingState();
  const { scrollY } = useParallax();
  useSmoothScroll();
  const [api, setApi] = useState<CarouselApi>();
  
  // Auto-scroll effect
  useEffect(() => {
    if (!api) return;
    
    // Create variable to track if user has interacted with carousel
    let userInteracted = false;
    let pauseTimeout: NodeJS.Timeout;
    
    // Set up auto-scroll interval with a longer initial delay
    const startAutoScroll = () => {
      return setInterval(() => {
        // Only auto-scroll if user hasn't interacted recently
        if (!userInteracted) {
          if (api.canScrollNext()) {
            api.scrollNext();
          } else {
            api.scrollTo(0);
          }
        }
      }, 5000); // Increased from 3000 to 5000 for better viewing experience
    };
    
    let intervalId = startAutoScroll();
    
    // Event handlers to detect user interaction
    const onUserInteraction = () => {
      // Clear existing pause timeout
      if (pauseTimeout) clearTimeout(pauseTimeout);
      
      // Stop auto-scrolling immediately
      userInteracted = true;
      clearInterval(intervalId);
      
      // Set a timeout to resume auto-scroll after longer inactivity (10 seconds)
      pauseTimeout = setTimeout(() => {
        userInteracted = false;
        intervalId = startAutoScroll();
      }, 500);
    };
    
    // Register all interaction events
    const elm = api.rootNode();
    
    // Mouse events
    elm.addEventListener('mouseenter', onUserInteraction);
    elm.addEventListener('mousemove', onUserInteraction);
    elm.addEventListener('click', onUserInteraction);
    
    // Touch events for mobile
    elm.addEventListener('touchstart', onUserInteraction);
    elm.addEventListener('touchmove', onUserInteraction);
    
    // Clean up all event listeners on component unmount
    return () => {
      clearInterval(intervalId);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      
      elm.removeEventListener('mouseenter', onUserInteraction);
      elm.removeEventListener('mousemove', onUserInteraction);
      elm.removeEventListener('click', onUserInteraction);
      elm.removeEventListener('touchstart', onUserInteraction);
      elm.removeEventListener('touchmove', onUserInteraction);
    };
  }, [api]);

  // References for scroll animations
  const heroRef = useScrollInView();
  const techStackRef = useScrollInView();
  const projectsRef = useScrollInView();
  const experienceRef = useScrollInView();
  const blogsRef = useScrollInView();
  const contactRef = useScrollInView();

  useEffect(() => {
    // Update time only on client-side
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(time);
    };
    
    // Initial update
    updateTime();
    
    // Update time every minute
    const interval = setInterval(updateTime, 60000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-[#191919] dark:bg-[#191919] bg-white text-black dark:text-white">
        {/* Navigation */}
        <motion.header 
          className="container mx-auto py-4 px-4 sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#191919]/70 border-b border-gray-200 dark:border-gray-800"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: isLoading ? 1.8 : 0 }}
        >
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">              {[
                { href: "#hero", label: "Home" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#blogs", label: "Blogs" },
                { href: "#contact", label: "Contact" }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >                  <Link 
                    href={item.href} 
                    className="relative group font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-[#5badff] dark:hover:text-[#5badff] px-1 py-2"
                    onClick={(e) => {
                      // Eğer anchor link ise özel işleme yap
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        const targetId = item.href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {                          // Anında geçiş sağla
                          window.scrollTo({
                            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
                            behavior: 'auto'
                          });
                        }
                      }
                    }}
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#ff3d00] to-[#5badff] transform scale-x-0 transition-transform group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </nav>
        </motion.header>

        <main>
          {/* Hero Section */}
          <section id="hero" className="container mx-auto py-16 px-4 text-center relative overflow-hidden" ref={heroRef.ref}>            {/* Parallax background elements */}
            <motion.div 
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-[#ff3d00]/10 to-[#5badff]/10 blur-3xl"
              initial={{ y: 0, rotate: 0 }}
              style={{ 
                y: isLoading ? 0 : scrollY * 0.2,
                rotate: isLoading ? 0 : scrollY * 0.05,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-[#5badff]/10 to-[#ff3d00]/10 blur-3xl"
              initial={{ y: 0, rotate: 0 }}
              style={{ 
                y: isLoading ? 0 : scrollY * -0.1,
                rotate: isLoading ? 0 : scrollY * -0.05,
              }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={heroRef.isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: isLoading ? 2 : 0.2 }}
            >
              <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden bg-gradient-to-r from-[#ff3d00] to-[#5badff]">                <motion.div 
                  className="absolute inset-[3px] rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image 
                    src="/me.jpeg" 
                    alt="Soner Yeşilay" 
                    width={154} 
                    height={154} 
                    className="object-cover" 
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={heroRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: isLoading ? 2.2 : 0.4 }}
            >
              <h1 className="text-5xl font-bold mb-4">
                Soner Yeşilay
                <br />
                <span className="bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">
                  <TypeAnimation
                    sequence={[
                      'Software Dev.',
                      2000,
                      'Programmer',
                      2000,
                      '.NET Core Dev.',
                      2000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ display: 'inline-block' }}
                    repeat={Infinity}
                  />
                </span>
              </h1>
            </motion.div>
            
            <br/>
            <motion.p 
              className="max-w-3xl mx-auto text-gray-400 dark:text-[#c5c5c5] mb-8 leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={heroRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: isLoading ? 2.4 : 0.6 }}
            >
Hello, I’m Soner Yeşilay, a Computer Programming graduate from Trakya University (Jan 2025) with hands-on experience in backend development from a 5-month internship. I’m passionate about applying my strong foundation in API design, database management, and clean-code principles to real-world projects, and I regularly share my work on GitHub and Medium. I aim to advance my career in software development by building scalable, sustainable solutions—feel free to explore my profiles or get in touch!            </motion.p>

            <motion.div 
              className="flex items-center justify-center space-x-4"
              initial={{ y: 50, opacity: 0 }}
              animate={heroRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: isLoading ? 2.6 : 0.8 }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <Link
                  href="#contact"
                  className="px-6 py-3 rounded-full border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-[#191919] transition-colors inline-block touch-manipulation"
                  onClick={(e) => {
                    // Ensure the link works on mobile by adding explicit handler
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      e.preventDefault();
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Contact
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://drive.google.com/file/d/1XZi121Qp7D5xX2KvCG8zbbM9KWk4-AFm/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-[#191919] hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white transition-colors"
                >
                  My Resume
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* Tech Stack */}
          <section id="tech" className="container mx-auto py-16 px-4 text-center" ref={techStackRef.ref}>
            <motion.h2 
              className="text-xl font-medium mb-10 text-gray-600 dark:text-[#8491a0]"
              initial={{ y: 50, opacity: 0 }}
              animate={techStackRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              What I Build With
            </motion.h2>
            <motion.div 
              className="flex justify-center gap-10 flex-wrap"
              initial={{ y: 50, opacity: 0 }}
              animate={techStackRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                "C#",
                ".NET CORE",
                "MVC",
                "MSSQL",
                "AWS"
              ].map((tech, index) => (
                <motion.div 
                  key={tech}
                  className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={techStackRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Projects */}
          <section id="projects" className="container mx-auto py-16 px-4" ref={projectsRef.ref}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={projectsRef.isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="relative text-center mb-16">
                <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#ff3d00]">PROJECTS</span>
                <span className="relative text-3xl font-bold text-[#ff3d00]">MY PROJECTS</span>
                <motion.div 
                  className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"
                  initial={{ width: 0 }}
                  animate={projectsRef.isInView ? { width: 80 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </h2>
            </motion.div>
            
            <Carousel 
              opts={{
                align: "start",
                loop: true
              }}
              className="relative w-full"
              setApi={setApi}
            >
              <CarouselContent>
                {/* Project Items */}
                {[
                  {
                    title: "Secure Authentication API",
                    subtitle: "BACK-END PROJECT",
                    tech: "Built with .NET Core Web Api",
                    image: "/projects/jwtidentity.png",
                    accent: "#5badff",
                    github: "https://github.com/soneryesilay/SecureAuth"
                  },
                  {
                    title: "Car Repair Reservation System",
                    subtitle: "FULL-STACK PROJECT",
                    tech: "Built with .NET Core Web Api and MVC",
                    image: "/projects/carrepair.jpg",
                    accent: "#ff3d00",
                    github: "https://github.com/soneryesilay/CarRepairReservationSystem"
                  },
                  {
                    title: "Hotel Management System",
                    subtitle: "FULL-STACK PROJECT",
                    tech: "Built with .NET Core and MVC",
                    image: "/projects/hotelmanagement.png",
                    accent: "#5badff",
                    github: "https://github.com/soneryesilay/Net-HotelApi-Project"
                  },                  {
                    title: "Portfolio Website",
                    subtitle: "FRONT-END PROJECT",
                    tech: "Built with Next.js and Tailwind CSS",
                    image: "https://i.hizliresim.com/b4tumam.png",
                    accent: "#ff3d00",
                    github:"#",
                  },
                  {
                    title: "Book Store Web API",
                    subtitle: "BACK-END PROJECT",
                    tech: "Built with .NET Core Web Api",
                    image: "/projects/bookstore.png",
                    accent: "#5badff",
                    github: "https://github.com/soneryesilay/BookStoreAppWebAPI"
                  },
                  {
                    title: "Restaurant Qr Menu",
                    subtitle: "FULL-STACK PROJECT",
                    tech: "Built with .NET Core Web Api and MVC",
                    image: "/projects/restaurant.png",
                    accent: "#ff3d00",
                    github: "https://github.com/soneryesilay/Net-QrMenu-WithSignalR"
                  },
                  {
                    title: "Iyzico 3D Pay Integration",
                    subtitle: "FULL-STACK PROJECT",
                    tech: "Built with .NET Core Web Api and Angular",
                    image: "/projects/IyzicoPay.png",
                    accent: "#5badff",
                    github: "https://github.com/soneryesilay/Iyzico3DPay-Angular-Net"
                  }                ].map((project, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">                    <motion.div 
                      className="bg-gray-100 dark:bg-[#222222] rounded-2xl overflow-hidden shadow-lg transform mx-2 cursor-pointer"
                      initial={{ 
                        opacity: 0, 
                        y: 50,
                        scale: 0.9
                      }}
                      animate={projectsRef.isInView ? { 
                        opacity: 1, 
                        y: 0,
                        scale: 1
                      } : {}}
                      transition={{ 
                        duration: 0.7, 
                        delay: index * 0.1 + 0.3,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.03, 
                        y: -10,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", 
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >                      <Link 
                        href={project.github} 
                        target={project.github === "#" ? "_self" : "_blank"}
                        onClick={project.github === "#" ? (e) => e.preventDefault() : undefined}
                        className="block"
                      >
                        <div className="relative h-[280px] overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4"
                            initial={{ opacity: 0 }}
                            animate={projectsRef.isInView ? { opacity: 1 } : {}}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.1 + 0.7
                            }}
                          >
                            <motion.h3 
                              className="text-lg font-bold text-white drop-shadow-md"
                              initial={{ y: 20, opacity: 0 }}
                              animate={projectsRef.isInView ? { y: 0, opacity: 1 } : {}}
                              transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1 + 0.8
                              }}
                            >
                              {project.title.split(" ").slice(0, -1).join(" ")}{" "}
                              <span style={{ color: project.accent }}>
                                {project.title.split(" ").slice(-1)}
                              </span>
                            </motion.h3>
                          </motion.div>
                        </div>                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-[#8491a0] mb-1">{project.subtitle}</p>
                            <p className="font-bold text-sm">{project.tech}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
                <motion.div 
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={projectsRef.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  initial={{ x: -20 }}
                  animate={projectsRef.isInView ? { x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <CarouselPrevious className="static translate-y-0 mx-2" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  initial={{ x: 20 }}
                  animate={projectsRef.isInView ? { x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <CarouselNext className="static translate-y-0 mx-2" />
                </motion.div>
              </motion.div>
            </Carousel>
            
            <motion.div 
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={projectsRef.isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="https://github.com/soneryesilay?tab=repositories" 
                  target="_blank"
                  className="px-6 py-3 rounded-full border-2 border-[#ff3d00] text-[#ff3d00] hover:bg-[#ff3d00] hover:text-white transition-colors inline-flex items-center"
                >
                  View All Projects
                  <Github className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* Experience */}
          <section id="experience" className="container mx-auto py-16 px-4" ref={experienceRef.ref}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={experienceRef.isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="relative text-center mb-16">
                <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#5badff]">EXPERIENCE</span>
                <span className="relative text-3xl font-bold text-[#5badff]">MY EXPERIENCE</span>
                <motion.div 
                  className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"
                  initial={{ width: 0 }}
                  animate={experienceRef.isInView ? { width: 80 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-12">              <motion.div 
                className="flex gap-6 bg-white dark:bg-[#1e1e1e] p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 transition-shadow duration-300"
                initial={{ y: 50, opacity: 0 }}
                animate={experienceRef.isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8, 
                  boxShadow: "0 20px 35px -12px rgba(0,0,0,0.25)", 
                  transition: { 
                    duration: 0.2, 
                    ease: "easeOut"
                  } 
                }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-r from-[#ff3d00] to-[#5badff] rounded-lg text-white shadow-md"                    whileHover={{ 
                      scale: 1.1, 
                      y: -2, 
                      transition: { 
                        duration: 0.15, 
                        ease: "easeOut"
                      } 
                    }}
                  >
                    <span className="font-bold text-xl">1</span>
                  </motion.div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-300">Back-end Developer - Intern at AkıllıPhone</h3>
                    <span className="text-gray-500 dark:text-[#8491a0]">2024 Feb - 2024 Jul</span>
                  </div>
                  <p className="text-gray-700 dark:text-[#c5c5c5] mb-4">
                    I worked on 3 projects using C# and .NET Core, optimized database queries for 15% better performance, and built a microservice with senior guidance. Gained practical experience through team collaboration and code reviews while contributing to the main company project.
                  </p>
                  
                  <motion.div 
                    className="mt-4 flex gap-2 flex-wrap"
                    initial={{ opacity: 0 }}
                    animate={experienceRef.isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {["C#", ".NET Core", "MSSQL", "Microservice"].map((skill, index) => (
                      <motion.span 
                        key={skill}
                        className="px-3 py-1 bg-gray-200 dark:bg-[#222222] rounded-full text-xs font-medium cursor-default"
                        initial={{ opacity: 0, x: -20 }}
                        animate={experienceRef.isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.7 }}                        whileHover={{ 
                          scale: 1.1, 
                          transition: { 
                            duration: 0.1, 
                            ease: "easeOut"
                          } 
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

            {/* Blog Section */}
            <section id="blogs" className="container mx-auto py-16 px-4" ref={blogsRef.ref}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={blogsRef.isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="relative text-center mb-16">
              <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#ff3d00]">BLOGS</span>
              <span className="relative text-3xl font-bold text-[#ff3d00]">MY BLOGS</span>
              <motion.div 
                className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"
                initial={{ width: 0 }}
                animate={blogsRef.isInView ? { width: 80 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* JWT Authentication Blog Post */}              <motion.div 
              className="bg-gray-100 dark:bg-[#222222] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={blogsRef.isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              >
                <Link 
                  href="https://medium.com/@soneryesilay/10-ad%C4%B1mda-asp-net-core-8-0-ile-jwt-tabanl%C4%B1-kimlik-do%C4%9Frulama-sistemi-olu%C5%9Fturma-65c775614937" 
                  target="_blank"
                  className="block"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                    src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*AALox1K041nEYILxKsqcGg.jpeg"
                    alt="JWT Authentication Blog"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-medium text-gray-500 dark:text-[#8491a0] mb-3 block">Medium Blog</span>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-[#5badff] transition-colors duration-300">10 Adımda .NET Core 8.0 ile JWT Tabanlı Kimlik Doğrulama</h3>
                    <p className="text-gray-700 dark:text-[#c5c5c5] mb-6 line-clamp-3">
                    ASP.NET Core 8.0 ile JWT tabanlı kimlik doğrulama sistemi oluşturma hakkında detaylı bir rehber. Adım adım uygulamalı örneklerle kimlik doğrulama sistemini nasıl kurabilirsiniz.
                    </p>
                  </div>
                </Link>
                <div className="px-8 pb-8 -mt-2">
                  <motion.div 
                  className="inline-flex items-center font-medium text-[#5badff] group-hover:text-[#3d90e3] transition-colors duration-300"
                  whileHover={{ x: 5 }} 
                  transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                  >
                  <Link 
                    href="https://medium.com/@soneryesilay/10-ad%C4%B1mda-asp-net-core-8-0-ile-jwt-tabanl%C4%B1-kimlik-do%C4%9Frulama-sistemi-olu%C5%9Fturma-65c775614937" 
                    target="_blank"
                    className="inline-flex items-center"
                  >
                    Read on Medium
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* CRUD with .NET Core and React Blog Post */}              <motion.div 
                className="bg-gray-100 dark:bg-[#222222] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={blogsRef.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Link 
                  href="https://medium.com/@soneryesilay/net-core-8-0-ve-react-19-1-ile-crud-i%CC%87%C5%9Flemleri-f3ea8568e535" 
                  target="_blank"
                  className="block"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*l_0erh4TrueVUeXBdd0pTQ.png"
                      alt="CRUD with .NET Core and React Blog"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-medium text-gray-500 dark:text-[#8491a0] mb-3 block">Medium Blog</span>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-[#5badff] transition-colors duration-300">.NET Core 8.0 ve React 19.1 ile CRUD İşlemleri</h3>
                    <p className="text-gray-700 dark:text-[#c5c5c5] mb-6 line-clamp-3">
                      Modern web uygulamaları geliştirmek için .NET Core 8.0 ve React 19.1 kullanarak CRUD (Create, Read, Update, Delete) işlemlerini nasıl yapacağınızı anlatan kapsamlı bir rehber.
                    </p>
                  </div>
                </Link>
                <div className="px-8 pb-8 -mt-2">
                  <motion.div 
                    className="inline-flex items-center font-medium text-[#5badff] group-hover:text-[#3d90e3] transition-colors duration-300"
                    whileHover={{ x: 5 }} 
                    transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                  >
                    <Link 
                      href="https://medium.com/@soneryesilay/net-core-8-0-ve-react-19-1-ile-crud-i%CC%87%C5%9Flemleri-f3ea8568e535" 
                      target="_blank"
                      className="inline-flex items-center"
                    >
                      Read on Medium
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Blog Post Placeholder */}              <motion.div 
                className="bg-gray-100 dark:bg-[#222222] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={blogsRef.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ 
                scale: 1.03, 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Link 
                  href="https://medium.com/@soneryesilay" 
                  target="_blank"
                  className="block"
                >
                  <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src="https://webmasto.com/wp-content/uploads/2017/08/Medium-Logo-1024x536.png"
                    alt="Future Blog Post"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="p-8">
                  <span className="text-xs font-medium text-gray-500 dark:text-[#8491a0] mb-3 block">Medium Blogs</span>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#5badff] transition-colors duration-300">Soon</h3>
                  <p className="text-gray-700 dark:text-[#c5c5c5] mb-6 line-clamp-3">
                    More technical tutorials and articles coming soon on my Medium profile.
                  </p>
                  </div>
                </Link>
                <div className="px-8 pb-8 -mt-2">
                  <motion.div 
                    className="inline-flex items-center font-medium text-[#5badff] group-hover:text-[#3d90e3] transition-colors duration-300"
                    whileHover={{ x: 5 }} 
                    transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                  >
                    <Link 
                    href="https://medium.com/@soneryesilay" 
                    target="_blank"
                    className="inline-flex items-center"
                    >
                    Read on Medium
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={blogsRef.isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="https://medium.com/@soneryesilay" 
                target="_blank"
                className="px-6 py-3 rounded-full border-2 border-[#5badff] text-[#5badff] hover:bg-[#5badff] hover:text-white transition-colors inline-flex items-center"
              >
                View All Blog Posts
                <svg viewBox="0 0 1043.63 592.71" className="w-5 h-5 ml-2 fill-current">
                <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
                </svg>
              </Link>
              </motion.div>
            </motion.div>
            </section>

          {/* Contact Section - Responsive to Theme */}
          <section id="contact" className="bg-white dark:bg-[#191919] py-10 mt-16 border-t border-gray-200 dark:border-gray-800" ref={contactRef.ref}>
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.h2 
                  className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Contact Me
                </motion.h2>
                
                <motion.div 
                  className="flex items-center justify-center mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-gray-100 dark:bg-[#222222] rounded-full px-4 py-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 dark:text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-700 dark:text-white">
                      Istanbul Time: {currentTime}
                    </span>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-gray-400 dark:text-gray-300 mb-6 text-center max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Have a question or interested in working together? Feel free to reach out! I'm always open to discussing new projects, opportunities, or simply connecting with fellow developers. Let's build something great together!
                </motion.p>
                
                <motion.div 
                  className="flex items-center justify-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:soneryesilay@outlook.com" className="text-gray-300 dark:text-white hover:text-[#5badff] transition-colors">
                      soneryesilay@outlook.com
                    </a>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="flex justify-center space-x-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href="https://github.com/soneryesilay"
                      target="_blank"
                      className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors"
                    >
                      <Github size={20} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href="https://www.linkedin.com/in/soneryesilay/"
                      target="_blank"
                      className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors"
                    >
                      <Linkedin size={20} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href="https://stackoverflow.com/users/23093350/soner"
                      target="_blank"
                      className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5 fill-current">
                        <path d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>
                
                <motion.p 
                  className="mt-6 text-gray-500 dark:text-gray-500 text-sm text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  © 2025 Soner Yeşilay. All rights reserved.
                </motion.p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
