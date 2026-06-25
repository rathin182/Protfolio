"use client";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  active?: boolean;
};

export default function ProjectCard({
  id,
  title,
  description,
  image,
  tech,
  active = false,
}: Props) {
  return (
    <div
      className={`relative flex flex-col items-center transition-all duration-500 ${
        active ? "scale-110 z-20" : "scale-80 opacity-75"
      }`}
    >
      {/* Floor Glow */}
      

      {/* Screenshot */}
      <div className="relative z-20">
        <div
          className="
            absolute
            inset-0
            rounded-[32px]
            bg-[#52ca56]/20
            blur-3xl
          "
        />

        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-[#52ca56]/20
            bg-[#071018]
            shadow-[0_0_60px_rgba(82,202,86,0.2)]
          "
        >
          <img
            src={image}
            alt={title}
            className="
              h-[300px]
              w-[400px]
              object-cover
            "
          />
        </div>
      </div>


      {/* Content Cylinder */}
      <div className="relative w-[400px]">
        <div
          className="
            min-h-[380px]
            rounded-b-[34px]
            border-x
            border-b
            border-[#52ca56]/20
            bg-[#071018]
            px-8
            pt-8
            pb-10
          "
        >
          <span className="text-5xl font-bold text-[#52ca56]">
            {id}
          </span>

          <h3 className="mt-5 text-[36px] font-semibold leading-tight text-white">
            {title}
          </h3>

          <p className="mt-5 text-base leading-8 text-white/60">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {tech.map((item) => (
              <span
                key={item}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-black/40
                  px-4
                  py-2
                  text-sm
                  text-white/70
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Glow */}
        
      </div>
    </div>
  );
}