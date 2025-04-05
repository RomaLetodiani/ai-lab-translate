import { socialsConst } from "@/lib/socials.const";

export const Footer = () => (
  <footer className="mx-8 mb-8 flex flex-wrap items-center justify-center gap-10 rounded-3xl bg-black p-8">
    <div className="grid w-full grid-cols-4 justify-items-center gap-11 text-xl text-white md:grid-cols-7 lg:flex lg:justify-center">
      {socialsConst.map((social, index) => (
        <a key={index} href={social.url} target="__blank">
          {social.icon}
        </a>
      ))}
    </div>
  </footer>
);
