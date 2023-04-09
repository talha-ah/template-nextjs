import * as React from "react"

import { Contact, Props as ContactProps } from "./Contact"
import { Navigation, Props as NavigationProps } from "./Navigation"

interface Props extends NavigationProps, ContactProps {}

export const Header = (props: Props) => {
  const { links, logo, availability, socials, contact } = props

  return (
    <>
      <Contact
        socials={socials}
        contact={contact}
        availability={availability}
      />

      <Navigation links={links} logo={logo} />
    </>
  )
}
