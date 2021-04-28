import React from 'react'
import ContentLoader from 'react-content-loader'

const BookListLoader = ({
    row = 3,
    column = 3,
    width = 1466,
    padding = 25,
    borderRadius = 15,
    ...props
}) => {
    const list = []
    let height

    for (let i = 1; i <= row; i++) {
        const itemWidth = (1300 - padding * (column + 1)) / column
        const height1 = (itemWidth * 12) / 16
        const space = height1 + 6 * 6
        const yHeading = padding + space * (i - 1)

        for (let j = 0; j < column; j++) {
            const x = padding + j * (itemWidth + 110)
            const y1 = yHeading + 1 / 2
            const y2 = y1 + 1 + height1
            const y3 = y2 + padding / 2 + 20

            list.push(
                <>
                    <rect
                        x={x}
                        y={y1}
                        rx={borderRadius}
                        ry={borderRadius}
                        width={itemWidth}
                        height={height1}
                    />
                </>
            )

            if (i === row) {
                height = y3 + 20
            }
        }
    }

    return (
        <ContentLoader
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            {...props}
        >
            {list}
        </ContentLoader>
    )
}

export default BookListLoader;