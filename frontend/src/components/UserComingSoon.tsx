import { Clock3 } from "lucide-react";

const UserComingSoon = () => {
  return (
    <div className="flex min-h-[calc(100vh-1px)] items-center justify-center px-5 py-10">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <Clock3 size={30} className="text-slate-700" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Coming soon
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
          We're still working on this part of SignalHaive. It will be available
          soon.
        </p>

        <div className="mt-6 inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
          Under development
        </div>
      </div>
    </div>
  );
};

export default UserComingSoon;