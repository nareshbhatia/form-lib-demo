import moment from 'moment';
import 'moment-timezone';
import 'moment-duration-format';

export class DateTimeUtils {
    /**
     * @param {Date} time
     * @param {string} timezone
     * @returns {string} e.g. Jan 01, 2016 9:00 AM
     */
    static timeToShortStr(time, timezone) {
        if (!time || !timezone) {
            return null;
        }

        return moment(time)
            .tz(timezone)
            .format('MMM DD, YYYY hh:mm A');
    }

    /**
     * @param {number} millis - duration in milliseconds
     * @returns {string} duration in 'hh:mm' format, e.g. 01:30
     */
    static millisToDurationStr(millis) {
        return moment.duration(millis).format('hh:mm', { trim: false });
    }

    /**
     * @param {string} durationStr - duration in formats acceptable to moment, e.g. PT1H30M (ISO 8601), 01:30
     * @returns {number} duration in milliseconds
     */
    static durationStrToMillis(durationStr) {
        return moment.duration(durationStr).asMilliseconds();
    }
}
