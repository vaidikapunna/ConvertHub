interface LoadingScreenProps {
  label: string;
}

export function LoadingScreen({ label }: LoadingScreenProps) {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-100">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-400/30 border-t-cyan-300" />
        <p className="text-lg font-semibold">{label}</p>
        <p className="mt-2 text-sm text-slate-400">Preparing the browser workspace.</p>
      </div>
    </div>
  );
}
