import { useRef } from 'react'
import toast from 'react-hot-toast'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FieldError, FieldLabel } from '@/components/ui/field'
import { useUploadMedia } from '@/hooks/useAdminMedia'

export function ImageUploadField({
  id,
  label = 'Image',
  value,
  onChange,
  error,
}: {
  id: string
  label?: string
  value: string
  onChange: (url: string) => void
  error?: { message?: string }
}) {
  const uploadMedia = useUploadMedia()
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const asset = await uploadMedia.mutateAsync(file)
      onChange(asset.url)
      toast.success('Image uploaded')
    } catch {
      toast.error('Image upload failed')
    } finally {
      event.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="size-16 shrink-0 rounded-lg border border-border object-cover"
          />
        ) : null}
        <Button
          type="button"
          variant="secondary"
          disabled={uploadMedia.isPending}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="size-4" />
          {uploadMedia.isPending ? 'Uploading…' : 'Upload Image'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <Input
        id={id}
        placeholder="Or paste an image URL"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError errors={[error]} />
    </div>
  )
}
