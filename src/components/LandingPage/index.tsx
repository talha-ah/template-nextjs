import * as React from "react"

import { Box } from "@mui/material"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import { APP_NAME } from "@utils/constants"

import { About } from "./About"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Reviews } from "./Reviews"
import { Services } from "./Services"
import { ContactUs } from "./ContactUs"
import { Jumbotron } from "./Jumbotron"

const links = [
  { title: "Home", url: "#" },
  { title: "Services", url: "#services" },
  { title: "Reviews", url: "#testimonials" },
  { title: "About", url: "#about" },
  { title: "Contact", url: "#contact" },
]

const availability = {
  time: {
    start: "9:00",
    end: "17:00",
  },
  days: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  },
}

const socials = [
  { name: "Facebook", url: "https://facebook.com" },
  { name: "Twitter", url: "https://twitter.com" },
  { name: "Instagram", url: "https://instagram.com" },
  { name: "Youtube", url: "https://youtube.com" },
]

const contact = {
  phone: "1234-678-9011",
  email: "info@template.com",
}

const jumbotron = {
  title: "Web and Mobile App Development",
  description:
    "We'll help you to build your web and mobile app. We'll help you to build your web and mobile app.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
}

const servicesHeader = {
  title: "Our Services",
  description:
    "The first mate and his Skipper will do their very best to make the others comfortable in their tropic island nest.",
}

const services = [
  {
    url: "#",
    icon: "electrical_services",
    title: "Web Development",
    description:
      "The first mate and his Skipper too will do their very best to make the others comfortable",
  },
  {
    url: "#",
    icon: "light_bulb",
    title: "Mobile App Development",
    description:
      "The first mate and his Skipper too will do their very best to make the others comfortable",
  },
  {
    url: "#",
    icon: "handyman",
    title: "UI/UX Design",
    description:
      "The first mate and his Skipper too will do their very best to make the others comfortable",
  },
]

const aboutHeader = {
  title: "About Us",
}

const aboutSections = [
  {
    url: "#",
    icon: "badge_outlined",
    title: "Certified Professionals",
    description:
      "Believe it or not I'm walking on air. I never thought I could feel so free. Flying away on a wing and a",
  },
  {
    url: "#",
    icon: "handyman_outlined",
    title: "We Offer Quality Work",
    description:
      "Believe it or not I'm walking on air. I never thought I could feel so free. Flying away on a wing and a",
  },
  {
    url: "#",
    icon: "people_alt_outlined",
    title: "Dedicated Team",
    description:
      "Believe it or not I'm walking on air. I never thought I could feel so free. Flying away on a wing and a",
  },
  {
    url: "#",
    icon: "access_time_outlined",
    title: "24/7 Avilability",
    description:
      "Believe it or not I'm walking on air. I never thought I could feel so free. Flying away on a wing and a",
  },
]

const contactHeader = {
  title: "Contact Us",
  description: "Have a question or need a quote? Get in touch with us!",
}

const reviewsHeader = {
  title: "What Our Customers Say",
  description: "Check out these reviews from our satisfied customers",
}

const reviews = [
  {
    customer: "John Doe",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna. Sed vel nibh velit. Mauris et lorem eu est porta facilisis. Vestibulum lacinia nisi eget urna volutpat elementum.",
  },
  {
    customer: "Jane Smith",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna. Sed vel nibh velit. Mauris et lorem eu est porta facilisis. Vestibulum lacinia nisi eget urna volutpat elementum.",
  },
  {
    customer: "Bob Johnson",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna. Sed vel nibh velit. Mauris et lorem eu est porta facilisis. Vestibulum lacinia nisi eget urna volutpat elementum.",
  },
]

const copyright = {
  name: APP_NAME,
  year: new Date().getFullYear(),
}

const footerLinks = [
  { title: "Home", url: "#" },
  { title: "About Us", url: "#about" },
  { title: "Our Services", url: "#services" },
  { title: "Testimonials", url: "#testimonials" },
  { title: "Contact Us", url: "#contact" },
]

const footer = {
  socials: socials,
  contact: contact,
  links: footerLinks,
  services: services,
  availability: availability,
  about:
    "together yet they were all alone. Wouldn't you like to get away? Sometimes you want to go where everybody",
}

const theme = createTheme()

export const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: "#f5f5f5" }}>
        <Header
          links={links}
          logo={APP_NAME}
          socials={socials}
          contact={contact}
          availability={availability}
        />

        <main>
          <Jumbotron post={jumbotron} />

          <Services sections={services} header={servicesHeader} />

          <About sections={aboutSections} header={aboutHeader} />

          <Reviews header={reviewsHeader} sections={reviews} />

          <ContactUs header={contactHeader} />
        </main>

        <Footer copyright={copyright} footer={footer} />
      </Box>
    </ThemeProvider>
  )
}
