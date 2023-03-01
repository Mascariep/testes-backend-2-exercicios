import { v4 } from 'uuid'

export class IdManager {
    public generate(): string {
        return v4()
    }
}