import { getSegment, setSegment } from 'aws-xray-sdk'

// TODO: move to typescript v5 decorator
export function xray (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: any[]) {
    const segment = getSegment()

    // if xray is not enabled return the original method
    if (segment === undefined) {
      return originalMethod.apply(this, args)
    }

    const name = `${target.constructor.name}.${propertyKey}`

    const subsegment = segment.addNewSubsegment(name)

    try {
      setSegment(subsegment)

      const result = await originalMethod.apply(this, args)

      return result
    } catch (error: any) {
      subsegment.addError(error as Error)

      throw error
    } finally {
      subsegment.close()

      setSegment(segment)
    }
  }
}
