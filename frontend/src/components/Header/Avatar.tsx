import * as HoverCard from '@radix-ui/react-hover-card'

const Avatar = () => (
    <HoverCard.Root>
        <HoverCard.Trigger asChild>
            <a
                className='ImageTrigger'
                // href="https://twitter.com/radix_ui"
                // target="_blank"
                // rel="noreferrer noopener"
            >
                <img
                    className='Image normal'
                    src='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
                />
            </a>
        </HoverCard.Trigger>

        <HoverCard.Portal>
            <HoverCard.Content className='HoverCardContent' sideOffset={5}>
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 7 }}
                >
                    <img
                        className='Image large'
                        src='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
                        alt='Radix UI'
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 15,
                        }}
                    >
                        <div>
                            <div className='Text bold'>Karin Thier</div>
                            <div className='Text faded'>@kthier</div>
                        </div>
                        <div className='Text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Doloremque sequi neque soluta aut quo
                            excepturi provident, deleniti culpa quae pariatur
                            recusandae est molestiae corrupti nobis, blanditiis
                            nihil vel consequatur sint.
                        </div>
                        <div style={{ display: 'flex', gap: 15 }}>
                            <div style={{ display: 'flex', gap: 5 }}>
                                <div className='Text bold'>0</div>{' '}
                                <div className='Text faded'>Following</div>
                            </div>
                            <div style={{ display: 'flex', gap: 5 }}>
                                <div className='Text bold'>2,900</div>{' '}
                                <div className='Text faded'>Followers</div>
                            </div>
                        </div>
                    </div>
                </div>

                <HoverCard.Arrow className='HoverCardArrow' />
            </HoverCard.Content>
        </HoverCard.Portal>
    </HoverCard.Root>
)

export default Avatar
