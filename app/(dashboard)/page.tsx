"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className={
          "w-screen h-screen mx-auto text-center pt-12.5 md:pt-25 max-h-full"
        }
      >
        <h1 className="text-center font-sans text-blue-600 mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl ">
          Seja bem-vindo
        </h1>
        <p className="text-center mb-6 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 ">
          Este é o meu portifólio privado, aqui eu vou enviar minhas atividades,
          trabalhos e futuros projetos.
        </p>

        <div className={"pt-25"}>
          <Link
            href={"#sobre"}
            className={
              "mx-auto animate-bounce hover:cursor-pointer bg-white border border-[#e5e7eb] p-2 max-w-10 max-h-10 w-10 h-10 ring-1 ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center"
            }
          >
            <svg
              className="w-6 h-6 text-blue-500 mx-auto"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </Link>
        </div>
      </div>
      <hr
        id={"sobre"}
        className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
      />

      <div className={"md:flex md:justify-center justify-items-center"}>
        <Image
          alt={"cat gif"}
          src={"/cat-computer.gif"}
          className={"mx-auto md:h-112.5 md:w-112.5 w-auto h-auto"}
          unoptimized
          width={150}
          height={150}
        />
        <div className="md:max-w-1/3 text-center mx-auto">
          <h1 className={"text-center font-bold text-[30px] text-slate-800"}>
            Sobre mim
          </h1>
          <br />
          <p className={"mx-auto text-center md:text-left max-w-4/5"}>
            Meu nome é Ricardo, sou estudante do 1º ano do novo ensino médio,
            cursando Desenvolvimento de Sistemas. Tenho grande afinidade com
            matemática e tecnologia, áreas que me fascinam pela lógica e
            precisão.
            <br />
            <br />
            Comecei a programar aos 10 anos criando bots para Discord com
            Node.js. Com o tempo, aprofundei meus conhecimentos em Java — minha
            linguagem principal — e atualmente estudo desenvolvimento web com
            Next.js, React, HTML, CSS e JavaScript.
            <br />
            <br />
            Meu objetivo é me tornar um programador de alto nível, atuando em
            grandes empresas e explorando também a área de segurança da
            informação, garantindo qualidade e confiabilidade nos meus projetos.
          </p>
          <div className={"mx-auto w-fit"}>
            <Link
              href={"https://github.com/yRicardinBaum"}
              rel="noopener noreferrer"
              target="_blank"
              className={"hover:cursor-pointer"}
            >
              <Image
                width={36}
                height={36}
                className={"mt-5 animate-bounce mx-auto"}
                alt={"github"}
                src={"/github.png"}
              ></Image>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <br />
      <h1 className={"text-center font-bold text-[30px] text-slate-800 mb-10"}>
        Planos
      </h1>
      <ol className="flex justify-center items-center w-full p-3 space-x-2 text-sm lg:text-xl text-center text-gray-500">
        <li className="flex items-center text-yellow-400">
          ⏳ Estudar e conquistar um estágio
        </li>
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 sm:ml-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          ></path>
        </svg>
        <li className="flex items-center">🌎 Tornar-me fluente em inglês</li>
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 sm:ml-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          ></path>
        </svg>
        <li className="flex items-center">
          🚀 Construir uma carreira de sucesso
        </li>
      </ol>

      <br />
      <br />
      <br />
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <br />
      <br />
      <h1 className={"text-center font-bold text-[30px] text-slate-800 mb-10"}>
        Mais sobre...
      </h1>
      <br />
      <div
        className={
          "space-y-4 mx-auto md:mx-0 md:space-y-0 md:flex md:flex-rows md:justify-center md:space-x-40"
        }
      >
        <div className={"text-center text-slate-800 order-1"}>
          <h1 className={"text-[20px] font-bold mb-6"}>
            Resolução de problemas
          </h1>
          <p className={"max-w-100 mx-auto md:mx-0"}>
            Tenho facilidade em analisar problemas e buscar soluções eficientes,
            sempre me adaptando a novas tecnologias e desafios.
          </p>
        </div>
        <div className={"text-center text-slate-800 order-2"}>
          <h1 className={"text-[20px] font-bold mb-6"}>Faculdade</h1>
          <p className={"max-w-100 mx-auto md:mx-0"}>
            Pretendo ingressar em uma faculdade na área de tecnologia e, se
            possível, conquistar experiência prática antes mesmo da formação.
          </p>
        </div>
        <div className={"text-center text-slate-800 order-3"}>
          <h1 className={"text-[20px] font-bold mb-6"}>Fluência em inglês</h1>
          <p className={"max-w-100 mx-auto md:mx-0"}>
            Busco fluência total em inglês para ampliar oportunidades
            profissionais, inclusive no mercado internacional.
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <br />

      <br />
      <br />
      <figure className="max-w-3xl mx-auto text-center">
        <blockquote>
          <p className="text-2xl italic font-medium text-gray-900 dark:text-white">
            "Tente uma, duas, três vezes e se possível tente a quarta, a quinta
            e quantas vezes for necessário. Só não desista nas primeiras
            tentativas, a persistência é amiga da conquista. Se você quer chegar
            aonde a maioria não chega, faça o que a maioria não faz."
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3">
          <Image
            className="w-6 h-6 rounded-full"
            src="/billgates.jpg"
            alt="profile picture"
            width={100}
            height={100}
          />
          <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite className="pr-3 font-medium text-gray-900 dark:text-white">
              Bill Gates
            </cite>
            <cite className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
              CEO da Microsoft
            </cite>
          </div>
        </figcaption>
      </figure>
      <br />
      <br />
      <br />
      <br />
      <br />

      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 text-center justify-center">
        <span className="text-sm text-gray-500 text-center mx-auto">
          © 2023{" "}
          <a
            href="https://github.com/yRicardinBaum"
            className="hover:underline"
          >
            Ricardo™
          </a>
          . Todos os direitos reservados.
        </span>
      </footer>
    </>
  );
}
