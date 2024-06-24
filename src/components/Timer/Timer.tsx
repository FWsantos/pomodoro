import './Timer.css';

type TimerProps = {
    count: number;
    handlePlay: () => void;
};

function Timer({ count, handlePlay }: TimerProps) {

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    const handleClick = () => {
        console.log('Timer clicked')
        handlePlay();
    }



    return (
        <div className='timer' onClick={handleClick}>
            <p>{formatTime(count)}</p>
        </div>
    );
}

export default Timer;