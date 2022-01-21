
// mapping timestamp to a more readable format
export const mapTime = (timestamp: Number): string => {
    const seconds = Math.floor((+new Date() - +timestamp * 1000) / 1000);

    let interval: number = Math.floor(seconds / 31536000);
  
    if (interval >= 1) {
      return `${interval} years`;
    }
    interval = Math.floor(seconds / 2592000);
  
    if (interval >= 1) {
      return `${interval} months`;
    }
    interval = Math.floor(seconds / 86400);
  
    if (interval >= 1) {
      return `${interval} days`;
    }
    interval = Math.floor(seconds / 3600);
  
    if (interval >= 1) {
      return `${interval} hours`;
    }
    interval = Math.floor(seconds / 60);
  
    if (interval >= 1) {
      return `${interval} minutes`;
    }

    const ret: string = `${Math.floor(seconds)} seconds`
  
    return ret;
  };