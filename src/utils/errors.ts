export function logError(err, vm?, info?) {
    // if (process.env.NODE_ENV !== 'production')
    // {
    //     warn(`Error in ${ info }: "${ err.toString() }"`, vm)
    // }
    if (typeof window !== 'undefined' && typeof console !== 'undefined')
    {
        console.error(err)
        return
    } else
    {
        throw err
    }
}