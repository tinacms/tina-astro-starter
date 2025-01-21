
import React from 'react'

function FormattedDate({ date }: { date: string }) {
	const _date = new Date(date)
	return (
		<time datetime={_date.toISOString()}>
			{
				_date.toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				})
			}
		</time>
	)
}

export default FormattedDate



