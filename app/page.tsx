import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter, Youtube, Github, Linkedin } from "lucide-react"
import { ThemeToggle } from "../components/theme-toggle"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"

export default function Home() {
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

          {/* Mobile Menu - Hamburger and Dropdown */}
          <div className="md:hidden">
            <div className="relative">
              <input
                type="checkbox"
                id="menu-toggle"
                className="hidden peer"
              />
              <label
                htmlFor="menu-toggle"
                className="cursor-pointer p-2 flex flex-col justify-center items-center gap-1.5"
              >
                <span className="w-6 h-0.5 bg-gray-700 dark:bg-white transition-all peer-checked:rotate-45 peer-checked:translate-y-2"></span>
                <span className="w-6 h-0.5 bg-gray-700 dark:bg-white transition-all peer-checked:opacity-0"></span>
                <span className="w-6 h-0.5 bg-gray-700 dark:bg-white transition-all peer-checked:-rotate-45 peer-checked:-translate-y-2"></span>
              </label>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#222] rounded-lg shadow-lg opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all">
                {[
                  { href: "/", label: "Home" },
                  { href: "#projects", label: "Projects" },
                  { href: "#experience", label: "Experience" },
                  { href: "#contact", label: "Contact" }
                ].map((item) => (
                  <Link 
                    key={item.label}
                    href={item.href} 
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333] hover:text-[#5badff] dark:hover:text-[#5badff] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
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
              Back-End Developer
            </span>
          </h1>
        <br/>
          <p className="max-w-2xl mx-auto text-gray-800 dark:text-[#c5c5c5] mb-8 leading-relaxed">
            Back-end Developer specialized in C#, .Net Core, Linux, MSSQL, and AWS.
            My expertise lies in crafting robust and scalable backend solutions
            with a focus on security and performance.
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
            <div className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">LINUX</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">MSSQL</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">AWS</div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#ff3d00]">PROJECTS</h2>
          
          <Carousel 
            opts={{
              align: "start",
              loop: true
            }}
            className="relative w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[240px]">
                    <Image
                      src="#"
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
                    <Link href="https://github.com/soneryesilay/ReservationSystem" className="w-10 h-10 rounded-full bg-[#ff3d00] text-white flex items-center justify-center hover:bg-[#e03600] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[240px]">
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
                    <Link href="https://github.com/soneryesilay/Net-HotelApi-Project" className="w-10 h-10 rounded-full bg-[#5badff] text-white flex items-center justify-center hover:bg-[#4a9ae6] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[240px]">
                    <Image
                      src="/public/projects/resume.png"
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
                    <Link href="https://github.com/soneryesilay/resume" className="w-10 h-10 rounded-full bg-[#ff3d00] text-white flex items-center justify-center hover:bg-[#e03600] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[240px]">
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
                    <Link href="https://github.com/soneryesilay/BookStoreAppWebAPI" className="w-10 h-10 rounded-full bg-[#5badff] text-white flex items-center justify-center hover:bg-[#4a9ae6] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[240px]">
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
                    <Link href="https://github.com/soneryesilay/Net-QrMenu-WithSignalR" className="w-10 h-10 rounded-full bg-[#5badff] text-white flex items-center justify-center hover:bg-[#4a9ae6] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-gray-100 dark:bg-[#222222] rounded-lg overflow-hidden">
                  <div className="relative h-[240px]">
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
                    <Link href="https://github.com/soneryesilay/Iyzico3DPay-Angular-Net" className="w-10 h-10 rounded-full bg-[#5badff] text-white flex items-center justify-center hover:bg-[#4a9ae6] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
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
          <h2 className="text-3xl font-bold mb-10 text-center text-[#5badff]">EXPERIENCE</h2>

          <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-r from-[#ff3d00] to-[#5badff] rounded-lg text-white">
                  <span className="font-bold text-xl">1</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h3 className="text-xl font-bold">Back-end Developer - Intern at AkıllıPhone</h3>
                  <span className="text-gray-500 dark:text-[#8491a0]">2024 Feb - 2024 July </span>
                </div>
                <p className="text-gray-700 dark:text-[#c5c5c5]">
                  Worked as an intern back-end developer at AkıllıPhone for 6 months. Gained hands-on experience with
                  C# and .NET Core development. Contributed to various projects and improved my skills in database
                  management with MSSQL. Studied and explored microservice architectures during the internship period.
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

        {/* Contact Section - Responsive to Theme */}
        <section id="contact" className="bg-white dark:bg-[#191919] py-10 mt-16 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
                Contact
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-2xl mx-auto text-sm">
                Back-End Developer with experience in C#, .NET Core, Linux, MSSQL, and AWS
              </p>
              
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:soneryesilay@outlook.com" className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors">
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
                  className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
              
              <p className="mt-6 text-gray-500 dark:text-gray-500 text-sm text-center">
                © 2025 Soner Yeşilay. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
