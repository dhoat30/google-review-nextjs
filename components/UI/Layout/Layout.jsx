"use client";
import React from "react";
import ZigZagCardsSection from "./Sections/ZigZagCardsSection";
import RowSection from "./Sections/RowSection";
import ServicesSection from "./Sections/ServicesSection";
import ProcessSection from "./Sections/ProcessSection";
import ProjectsSection from "./Sections/ProjectsSection";
import ServiceTabs from "./Sections/ComboDealsSection";
import Packages from "./Sections/Packages";
import FaqAccordionSection from "./Sections/FaqAccordionSection";
import ServiceChecklist from "./Sections/ServiceChecklist";
import MenuSection from "./Sections/MenuSection";
import ComboDealsSection from "./Sections/ComboDealsSection";
import RowStatusSection from "./Sections/RowStatusSection";
import BackgroundImageRowSection from "./Sections/BackgroundImageRowSection";
import CateringPackageSection from "./Sections/CateringPackageSection";
export default function Layout({
  sections,
  comboDealsData,
  cateringPackagesData,
  className,
}) {
  if (!sections) return null;
  console.log(sections);

  const sectionsJSX = sections.map((section, index) => {
    if (section.acf_fc_layout === "zigzag_cards") {
      return (
        <ZigZagCardsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "row") {
      return (
        <RowSection
          key={index}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          showBeforeAfterImages={section.show_before_after_images}
          beforeImage={
            section.show_before_after_images &&
            section.before_after_images.before_image
          }
          afterImage={
            section.show_before_after_images &&
            section.before_after_images.after_image
          }
        />
      );
    }
    if (section.acf_fc_layout === "background_image_row") {
      return (
        <BackgroundImageRowSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          image={section.background_image}
          ctaGroup={section.cta_group}
          contentAlignment={section.content_alignment}
        />
      );
    }
    if (section.acf_fc_layout === "stats_row") {
      console.log(section);
      return (
        <RowStatusSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          statsArray={section.stats}
          image={section.images.main_image}
          firstSmallImage={section.images.first_small_image}
          secondSmallImage={section.images.second_small_image}
          ctaGroup={section.cta_group}
        />
      );
    }
    if (section.acf_fc_layout === "services") {
      return (
        <ServicesSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.card}
          sectionCtaGroup={section.cta_group}
        />
      );
    }
    if (section.acf_fc_layout === "process") {
      return (
        <ProcessSection
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }

    if (section.acf_fc_layout === "packages") {
      return (
        <Packages
          key={index}
          serviceName={section.service_name}
          title={section.title}
          packagesArray={section.package}
          termsAndConditions={section.terms_conditions}
        />
      );
    }
    if (section.acf_fc_layout === "local_faq") {
      return (
        <FaqAccordionSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          qaData={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "service_checklist") {
      return (
        <ServiceChecklist
          key={index}
          title={section.title}
          description={section.description}
          cards={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "menu_section") {
      return (
        <MenuSection
          key={index}
          title={section.title}
          description={section.description}
          cards={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "combo_deals") {
      if (!comboDealsData || section.show_combo_deals === false) return null;
      return (
        <ComboDealsSection
          key={index}
          title={comboDealsData.title}
          description={comboDealsData.description}
          cards={comboDealsData.combo_info}
        />
      );
    }

    if (section.acf_fc_layout === "catering_packages") {
      if (!cateringPackagesData || section.show_catering_packages === false) {
        return null;
      }
      return (
        <CateringPackageSection
          key={index}
          title={cateringPackagesData.title}
          description={cateringPackagesData.description}
          cards={cateringPackagesData.combo_info}
        />
      );
    }
  });

  return <div className={className}>{sectionsJSX} </div>;
}
