export class HGStatics 
{
    // Calls all functions in an array
    static OnCallbacks(CallbacksArray)
    {
        CallbacksArray.forEach((func) => {
            if (typeof func === 'function')
            {
                func();
            }
        });
    }

    // Copies the fields of one object to another
    static CopyValues(Source, Destination) {
        for (let key in Source) 
        {
            if (typeof Source[key] === 'object' && Source[key] !== null) 
            {
                Destination[key] = Destination[key] || {};
                this.CopyValues(Source[key], Destination[key]);
            } 
            else 
            {
                Destination[key] = Source[key];
            }
        }
    }
}