"use client"

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
  CarouselPrevious
} from "@/components/ui/carousel"

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update time only on client-side
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
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
    <div className="min-h-screen bg-[#191919] dark:bg-[#191919] bg-white text-black dark:text-white">
      {/* Navigation */}
      <header className="container mx-auto py-4 px-4 sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#191919]/70 border-b border-gray-200 dark:border-gray-800">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {[
              { href: "/", label: "Home" },
              { href: "#projects", label: "Projects" },
              { href: "#experience", label: "Experience" },
              { href: "#blogs", label: "Blogs" },
              { href: "#contact", label: "Contact" }
            ].map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                className="relative group font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-[#5badff] dark:hover:text-[#5badff] px-1 py-2"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#ff3d00] to-[#5badff] transform scale-x-0 transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto py-16 px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden bg-gradient-to-r from-[#ff3d00] to-[#5badff]">
              <div className="absolute inset-[3px] rounded-full overflow-hidden">
                <Image 
                  src="https://avatars.githubusercontent.com/u/122547220?s=400&u=0bb5982811c66b03c9a6b478bf805bbcfc7fcb8f&v=4" 
                  alt="Soner Yeşilay" 
                  width={154} 
                  height={154} 
                  className="object-cover" 
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Soner Yeşilay
            <br />
            <span className="bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">
              <TypeAnimation
                sequence={[
                  'Back-End Dev.',
                  2000,
                  '.NET Developer',
                  2000,
                  'C# Developer',
                  2000
                ]}
                wrapper="span"
                speed={50}
                style={{ display: 'inline-block' }}
                repeat={Infinity}
              />
            </span>
          </h1>
        <br/>
          <p className="max-w-3xl mx-auto text-gray-400 dark:text-[#c5c5c5] mb-8 leading-relaxed">
          I cultivated my passion for computers and software in childhood by developing game mods and setting up servers for friends. In 2022, I enrolled in Trakya University’s Computer Programming program, where I discovered a passion for web development. As a Back‑End Developer intern, I gained hands‑on experience with .NET technologies, C#, and object‑oriented programming. Since graduating in 2025, I’ve been focused on building clean, efficient solutions with C#, .NET Core, and MSSQL, while maintaining a strong interest in cloud computing and AWS.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="#contact"
              className="px-6 py-3 rounded-full border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-[#191919] transition-colors"
            >
              Get in Touch
            </Link>
            <Link
  href="/cv.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-[#191919] hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white transition-colors"
>
  My Resume
</Link>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto py-16 px-4 text-center">
          <h2 className="text-xl font-medium mb-10 text-gray-600 dark:text-[#8491a0]">What I Build With</h2>
          <div className="flex justify-center gap-10 flex-wrap">
            <div className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">C#</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">.NET CORE</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">MVC</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">MSSQL</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">AWS</div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="container mx-auto py-16 px-4">
          <h2 className="relative text-center mb-16">
            <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#ff3d00]">PROJECTS</span>
            <span className="relative text-3xl font-bold text-[#ff3d00]">MY PROJECTS</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"></div>
          </h2>
          
          <Carousel 
            opts={{
              align: "start",
              loop: true
            }}
            autoplay={true}
            autoplayInterval={5000}
            className="relative w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[360px]">
                    <Image
                      src="/projects/carrepair.jpg"
                      alt="Car Repair Reservation System"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">
                        Car Repair <span className="text-[#ff3d00]">Reservation System</span>
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#8491a0]">FULL-STACK PROJECT</p>
                      <p className="font-bold">Built with C# and .NET Core</p>
                    </div>
                    <Link href="https://github.com/soneryesilay/CarRepairReservationSystem" target="_blank"  className="w-10 h-10 rounded-full bg-[#ff3d00] text-white flex items-center justify-center hover:bg-[#e03600] transition-colors">
                      <Github className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[360px]">
                    <Image
                      src="https://media.licdn.com/dms/image/v2/D4D22AQFLJ8FiGD1jwA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1728481470690?e=1747872000&v=beta&t=DXsHRXYqEvPmrC-VGwgLtx4pSq_51YJ7pYqBjByb3Q8"
                      alt="Hotel API"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">
                        Hotel <span className="text-[#5badff]">Management System</span>
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#8491a0]">FULL-STACK PROJECT</p>
                      <p className="font-bold">Built with .NET Core and MVC</p>
                    </div>
                    <Link href="https://github.com/soneryesilay/Net-HotelApi-Project" target="_blank" className="w-10 h-10 rounded-full bg-[#5badff] text-white flex items-center justify-center hover:bg-[#4a9ae6] transition-colors">
                      <Github className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[360px]">
                    <Image
                      src="https://i.hizliresim.com/b4tumam.png"
                      alt="Portfolio Website"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">
                        Portfolio <span className="text-[#ff3d00]">Website</span>
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#8491a0]">FRONT-END PROJECT</p>
                      <p className="font-bold">Built with Next.js and Tailwind CSS</p>
                    </div>
                    <Link href="https://github.com/soneryesilay/resume" target="_blank" className="w-10 h-10 rounded-full bg-[#ff3d00] text-white flex items-center justify-center hover:bg-[#e03600] transition-colors">
                      <Github className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[360px]">
                    <Image
                      src="https://www.matillion.com/uploads/cards/Blog-API.png"
                      alt="Web API"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">
                        Book Store <span className="text-[#5badff]">Web API</span>
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#8491a0]">BACK-END PROJECT</p>
                      <p className="font-bold">Built with .NET Core Web Api</p>
                    </div>
                    <Link href="https://github.com/soneryesilay/BookStoreAppWebAPI" target="_blank" className="w-10 h-10 rounded-full bg-[#5badff] text-white flex items-center justify-center hover:bg-[#4a9ae6] transition-colors">
                      <Github className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[360px]">
                    <Image
                      src="https://media.licdn.com/dms/image/v2/D4D22AQEkdV7WUggiIA/feedshare-shrink_800/B4DZQH_eXKGUAg-/0/1735300872444?e=1747872000&v=beta&t=fNVXpD0sGWFF9ZRQ46LWFYk-5QCbHOtTSOdr9seyz0w"
                      alt="Web API"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">
                        Restaurant <span className="text-[#5badff]">Qr Menu</span>
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#8491a0]">FULL-STACK PROJECT</p>
                      <p className="font-bold">Built with .NET Core Web Api and MVC</p>
                    </div>
                    <Link href="https://github.com/soneryesilay/Net-QrMenu-WithSignalR" target="_blank" className="w-10 h-10 rounded-full bg-[#ff3d00] text-white flex items-center justify-center hover:bg-[#e03600] transition-colors">
                      <Github className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[360px]">
                    <Image
                      src="https://www.matillion.com/uploads/cards/Blog-API.png"
                      alt="Web API"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">
                        Iyzico 3D <span className="text-[#5badff]">Integration</span>
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#8491a0]">BACK-END PROJECT</p>
                      <p className="font-bold">Built with .NET Core Web Api and Angular</p>
                    </div>
                    <Link href="https://github.com/soneryesilay/Iyzico3DPay-Angular-Net" target="_blank" className="w-10 h-10 rounded-full bg-[#5badff] text-white flex items-center justify-center hover:bg-[#4a9ae6] transition-colors">
                      <Github className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </CarouselItem>


            </CarouselContent>
            
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 mx-2" />
              <CarouselNext className="static translate-y-0 mx-2" />
            </div>
          </Carousel>
        </section>

        {/* Experience */}
        <section id="experience" className="container mx-auto py-16 px-4">
          <h2 className="relative text-center mb-16">
            <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#5badff]">EXPERIENCE</span>
            <span className="relative text-3xl font-bold text-[#5badff]">MY EXPERIENCE</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"></div>
          </h2>

          <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex gap-6 bg-white dark:bg-[#1e1e1e] p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex-shrink-0">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-r from-[#ff3d00] to-[#5badff] rounded-lg text-white shadow-md">
                  <span className="font-bold text-xl">1</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-300">Back-end Developer - Intern at AkıllıPhone</h3>
                  <span className="text-gray-500 dark:text-[#8491a0]">2024 Feb - 2024 July</span>
                </div>
                <p className="text-gray-700 dark:text-[#c5c5c5] mb-4">
                  I worked on 3 projects using C# and .NET Core, optimized database queries for 15% better performance, and built a microservice with senior guidance. Gained practical experience through team collaboration and code reviews while contributing to the main company project.
                </p>
                
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-gray-200 dark:bg-[#222222] rounded-full text-xs font-medium">C#</span>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-[#222222] rounded-full text-xs font-medium">.NET Core</span>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-[#222222] rounded-full text-xs font-medium">MSSQL</span>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-[#222222] rounded-full text-xs font-medium">Microservice</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blogs" className="container mx-auto py-16 px-4">
          <h2 className="relative text-center mb-16">
            <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#ff3d00]">BLOGS</span>
            <span className="relative text-3xl font-bold text-[#ff3d00]">MY BLOGS</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.jpg"
                  alt="Blog Post 1"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6">
                <span className="text-xs text-gray-500 dark:text-[#8491a0] mb-2 block">None</span>
                <h3 className="text-xl font-bold mb-2">None</h3>
                <p className="text-gray-700 dark:text-[#c5c5c5] mb-4 line-clamp-3">
                  None
                </p>
                <Link 
                  href="https://medium.com/@soneryesilay" 
                  target="_blank"
                  className="text-[#5badff] hover:text-[#3d90e3] inline-flex items-center"
                >
                  Read on Medium
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.jpg"
                  alt="Blog Post 2"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6">
                <span className="text-xs text-gray-500 dark:text-[#8491a0] mb-2 block">None</span>
                <h3 className="text-xl font-bold mb-2">None</h3>
                <p className="text-gray-700 dark:text-[#c5c5c5] mb-4 line-clamp-3">
                  None
                </p>
                <Link 
                  href="https://medium.com/@soneryesilay" 
                  target="_blank"
                  className="text-[#5badff] hover:text-[#3d90e3] inline-flex items-center"
                >
                  Read on Medium
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.jpg"
                  alt="Blog Post 3"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6">
                <span className="text-xs text-gray-500 dark:text-[#8491a0] mb-2 block">None</span>
                <h3 className="text-xl font-bold mb-2">None</h3>
                <p className="text-gray-700 dark:text-[#c5c5c5] mb-4 line-clamp-3">
                  None
                </p>
                <Link 
                  href="https://medium.com/@soneryesilay" 
                  target="_blank"
                  className="text-[#5badff] hover:text-[#3d90e3] inline-flex items-center"
                >
                  Read on Medium
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
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
          </div>
        </section>

        {/* Contact Section - Responsive to Theme */}
        <section id="contact" className="bg-white dark:bg-[#191919] py-10 mt-16 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
                Contact Me
              </h2>
              
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-full px-4 py-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 dark:text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-gray-700 dark:text-white">
                    Istanbul Time: {currentTime}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-400 dark:text.gray-300 mb-6 text-center max-w-2xl mx-auto">
              Have a question or interested in working together? Feel free to reach out! I'm always open to discussing new projects, opportunities, or simply connecting with fellow developers. Let's build something great together!              </p>
              
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text.white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:soneryesilay@outlook.com" className="text-gray-300 dark:text.white hover:text-[#5badff] transition-colors">
                    soneryesilay@outlook.com
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6">
                <Link
                  href="https://github.com/soneryesilay"
                  target="_blank"
                  className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors"
                >
                  <Github size={20} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/soneryesilay/"
                  target="_blank"
                  className="text-gray-700 dark:text.white hover:text-[#5badff] transition-colors"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="https://stackoverflow.com/users/23093350/soner"
                  target="_blank"
                  className="text-gray-700 dark:text.white hover:text-[#5badff] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5 fill-current">
                    <path d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z" />
                  </svg>
                </Link>
              </div>
              
              <p className="mt-6 text-gray-500 dark:text.gray-500 text-sm text-center">
                © 2025 Soner Yeşilay. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
