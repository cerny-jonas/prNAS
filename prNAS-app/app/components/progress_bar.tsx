// https://flowbite.com/docs/components/progress/

const ProgressBar = ({ title, width, progress }: { title: string, width: string, progress: number }) => {
    return (
        <>
            <div className="mt-2 text-base font-medium text-white">{title}</div>
            <div className="w-full mb-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: width }}>{progress}%</div>
            </div>
        </>
    )
}

export default ProgressBar