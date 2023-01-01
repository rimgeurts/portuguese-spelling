export default function sortArray(array, sortKey) {
    const newArray = [...array];
    const sortedArray = newArray.sort((a, b) => {
        const keyA = new Date(a[sortKey]);
        const keyB = new Date(b[sortKey]);
        // Compare the 2 dates
        if (keyA > keyB) {
            return -1;
        }
        if (keyA < keyB) {
            return 1;
        }
        return 0;
    });
    return sortedArray;
}