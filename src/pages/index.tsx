import React from "react"
import Head from "next/head"
import type { NextPage } from "next"

import { APP_NAME } from "@utils/constants"

import { LandingPage } from "@components/LandingPage"

const Main: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingPage />
    </>
  )
}

export default Main
