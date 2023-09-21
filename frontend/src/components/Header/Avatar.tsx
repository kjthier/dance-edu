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
                            “I am of the opinion that my life belongs to the
                            whole community and as long as I live, it is my
                            privilege to do for it what I can. I want to be
                            thoroughly used up when I die, for the harder I
                            work, the more I live. I rejoice in life for its own
                            sake. Life is no brief candle to me. It is a sort of
                            splendid torch which I have got hold of for the
                            moment and I want to make it burn as brightly as
                            possible before handing it on to future
                            generations.” ― George Bernard Shaw
                        </div>
                        <div style={{ display: 'flex', gap: 15 }}>
                            <div style={{ display: 'flex', gap: 5 }}>
                                <div className='Text bold'>550</div>{' '}
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
