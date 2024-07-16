import React from 'react'
import FAQsElement from '../Components/FAQs/FAQsElement';
import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Footer from "../Components/Footer/Footer"
const faqs = [
    {
      question: "What is NGO HUB?",
      answer:
        "NGO Hub is like a central meeting place or resource center for non-governmental organizations (NGOs). It provides support, resources, and connections to help these organizations do their work better. This could include things like finding funding, getting training, or connecting with other groups working on similar issues. Its basically a helpful hub where NGOs can get what they need to make a positive impact in their communities or on global issues",
    },
    {
      question: "Why do we use it?",
      answer:
        "We use NGO Hubs to support non-governmental organizations (NGOs) in their missions. These hubs offer resources, networking opportunities, and services to help NGOs operate more effectively. By providing access to funding, training, collaboration opportunities, and advocacy tools, NGO Hubs enable NGOs to address social, environmental, and humanitarian issues more efficiently and impactfully. In essence, they serve as valuable support systems for NGOs, enhancing their capacity and amplifying their efforts towards positive change.",
    },
  
    {
      question: "Who can benefit from NGO HUB?",
      answer:
        "NGO HUB caters to a wide range of NGOs, including small community-based organizations, larger international NGOs, grassroots initiatives, and nonprofit startups. Essentially, any organization with a social mission can benefit from the resources and support offered by NGO HUB.",
    },
    {
      question: "Is NGO HUB free to use?",
      answer:
        "Yes, NGO HUB is free to use for registered NGOs. However, some premium services or events may have associated costs.",
    },
    {
      question: "How can my NGO join NGO HUB?",
      answer:
        "NGOs can join NGO HUB by registering on the platform's website and providing basic information about their organization and mission. Once registered, NGOs gain access to the platform's resources and community.",
    },
    {
      question: "Does NGO HUB provide assistance in setting up new NGOs?",
      answer:
        "While NGO HUB primarily focuses on supporting existing NGOs, it may offer resources and guidance for individuals or groups interested in starting new NGOs. This could include information on legal requirements, fundraising strategies, and best practices for organizational development.",
    },
    
    
    // Add more FAQ objects as needed
  ];
function FaqsPage() {
  return (
    <>
      <NavigationBar/>
      <FAQsElement faqs={faqs}/>
      <Footer/>
    </>
  )
}

export default FaqsPage
