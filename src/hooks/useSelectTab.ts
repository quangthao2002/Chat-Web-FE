import React, { useState } from "react"

type tab = "phone-book" | "home"

const useSelectTab = () => {
  const [selectTab, setSelectedTab] = useState<tab>("phone-book")

  return { selectTab, setSelectedTab }
}

export default useSelectTab
