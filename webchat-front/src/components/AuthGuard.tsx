type AuthGuardsProps<T extends object = Record<string, never>> = {
  render: React.FC<{} & T>
  props?: T
}

export const AuthGuard = <T extends object>({
  render: InnerComponent,
  props
}: Readonly<AuthGuardsProps<T>>) => {
  //   if (!user) {
  //     return <Auth />
  //   }

  //   return <InnerComponent user={user} {...(props as T)} />
  return <InnerComponent {...(props as T)} />
}
