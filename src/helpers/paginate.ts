// -- Helper to get pagination component --
export function getPaginationPipeline(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return [
        { $skip: skip },
        { $limit: limit },
    ];
}