const Block = ({ children, }: { children: React.ReactNode }) => {
    return (
        <article className="flex-initial w-auto h-auto bg-slate-500/40 rounded-xl border-8 border-slate-900/30 p-2 ">
            {children}
        </article>
    )
}

export default Block