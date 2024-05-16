import './Timer.css';

type TimerProps = {
    count: number;
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function Timer({ count }: TimerProps) {
    return (
        <div className='timer'>
            <p>{formatTime(count)}</p>
        </div>
    );
}

export default Timer;