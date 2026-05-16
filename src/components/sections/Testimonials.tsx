import { useState } from "react";

import { useTranslate } from "@tolgee/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const { t } = useTranslate();
  return (
    <section id="reviews" className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="eyebrow text-gold">{t("testimonials.eyebrow")}</span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[320px_1fr]">
          <div>
            <h3 className="text-5xl font-bold uppercase text-black">
              {t("testimonials.subtitle")}
            </h3>

            <div className="mt-6 flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src="https://cdn.trustindex.io/assets/platform/Tripadvisor/star/f.svg"
                  alt="star"
                  className="h-10 w-10"
                />
              ))}
            </div>

            <p className="mt-4 text-lg text-black/70">{t("testimonials.description")}</p>

            <div className="mt-6 flex items-center gap-3">
              <img
                src="https://cdn.trustindex.io/assets/platform/Tripadvisor/icon.svg"
                alt="Tripadvisor"
                className="h-8"
              />

              <span className="text-2xl font-semibold text-black">Tripadvisor</span>
            </div>
          </div>

          <div className="overflow-hidden">
            <Swiper
              className="overflow-visible!"
              modules={[Autoplay, Mousewheel, FreeMode]}
              slidesPerView={1.2}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
              }}
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.35,
                momentumVelocityRatio: 0.5,
              }}
              autoplay={{
                delay: 8000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop
              spaceBetween={24}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },

                1280: {
                  slidesPerView: 2.4,
                },
              }}
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="h-full min-h-80 rounded-3xl bg-white p-6 text-black">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="h-14 w-14 rounded-full object-cover"
                        />

                        <div>
                          <h3 className="text-xl font-semibold">{item.name}</h3>

                          <p className="text-sm text-black/50">
                            {t(`testimonials.time.${item.id - 1}`)}
                          </p>
                        </div>
                      </div>

                      <img
                        src="https://cdn.trustindex.io/assets/platform/Tripadvisor/icon.svg"
                        alt="Tripadvisor"
                        className="h-6"
                      />
                    </div>

                    <div className="mt-6 flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <img
                          key={i}
                          src="https://cdn.trustindex.io/assets/platform/Tripadvisor/star/f.svg"
                          alt="star"
                          className="h-7 w-7"
                        />
                      ))}
                    </div>

                    <p
                      className={`mt-6 text-lg leading-relaxed text-black/80 transition-all duration-500 ease-in-out ${
                        expandedReview === item.id ? "" : "line-clamp-4"
                      }`}
                    >
                      {t(`testimonials.comment.${item.id - 1}`)}
                    </p>

                    <button
                      onClick={() => setExpandedReview(expandedReview === item.id ? null : item.id)}
                      className="mt-8 text-lg font-medium text-black/40 transition hover:text-black"
                    >
                      {expandedReview === item.id
                        ? t("testimonials.show_less")
                        : t("testimonials.show_more")}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
