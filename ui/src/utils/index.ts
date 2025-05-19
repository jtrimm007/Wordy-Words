import { MD5 } from 'crypto-js';
import SHA256 from 'crypto-js/sha256';

export const hashData = (data: any): string => {
    return SHA256(JSON.stringify(data)).toString();
};

export const hashDataMD5 = (data: any): string => {
    return MD5(JSON.stringify(data)).toString();
};
