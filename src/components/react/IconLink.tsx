import React from 'react'
import ReactIcon from './icon'

type LinkProps = {
    title: string;
    link: string;
    icon: string;
}
function IconLink({ title, link, icon }: LinkProps) {
    return (
        <a href={link} target="_blank" aria-label={`Go to ${title}`}>
            <span className="sr-only">{title}</span>
            <ReactIcon iconName={icon} />
        </a>
    )
}

export default IconLink
