interface SideImageProps {
  title: string;
}

export const SideImage: React.FC<SideImageProps> = () => (
  <div className="hidden md:flex w-1/2 bg-primary-500 items-center justify-center relative">
    <img src="/europa-white.svg" alt="Europa" width="400" />

    {/* Footer - Tudo na mesma linha */}
    <div className="absolute bottom-6 left-0 right-0 px-8 cursor-default">
      <div className="flex items-center justify-center gap-3 text-xs">
        <p className="text-white font-light">
          Powered by <span className="font-medium">KB2 Sistemas</span>
        </p>

        <span className="text-white">|</span>

        <a
          href="/termos-de-servico"
          className="text-white hover:text-white/90 font-light transition-all duration-300"
        >
          Termos de Serviço
        </a>

        <span className="text-white">|</span>

        <a
          href="/politica-de-privacidade"
          className="text-white hover:text-white/90 font-light transition-all duration-300"
        >
          Política de Privacidade
        </a>
      </div>
    </div>
  </div>
);
