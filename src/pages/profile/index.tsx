import Head from "next/head"
import * as React from "react"
import { useRouter } from "next/router"
import { useState, useEffect, useMemo } from "react"

import { Box, Tabs, Tab } from "@mui/material"
import { Replay as ReplayIcon, Delete } from "@mui/icons-material"

import { Title } from "@ui/Title"
import { Dialog } from "@ui/Dialog"
import { Button } from "@ui/Button"
import { Select } from "@ui/Select"
import { Confirm } from "@ui/Confirm"
import { useApi } from "@hooks/useApi"
import { InviteUser } from "@forms/users"
import { DataTable } from "@ui/DataTable"
import { User, Invite } from "@utils/types"
import { IconButton } from "@ui/IconButton"
import { HeaderLayout } from "@layouts/Header"
import { checkPermission } from "@utils/common"
import { useAppContext } from "@contexts/index"
import { APP_NAME, ENDPOINTS } from "@utils/constants"
import { getFullName, toTitleCase } from "@utils/common"
import { UpdateOrganization } from "@forms/organization"
import { SelectTheme, UpdateProfile, UpdatePassword } from "@forms/profile"

export default function ProfileSettings() {
  const router = useRouter()
  const { query } = router
  const { state } = useAppContext()

  const [tab, setTab] = useState("profile")
  const [canManageOrg, setCanManageOrg] = useState(false)

  useEffect(() => {
    if (
      query.tab &&
      query.tab !== "profile" &&
      checkPermission(state?.auth?.user?.permissions, "Dashboard", "users")
    ) {
      setTab(query.tab as string)
    } else {
      setTab("profile")
    }

    if (checkPermission(state?.auth?.user?.permissions, "Dashboard", "users")) {
      setCanManageOrg(true)
    }
    // eslint-disable-next-line
  }, [query, state.auth.user])

  return (
    <>
      <Head>
        <title>Profile - {APP_NAME}</title>
      </Head>

      <HeaderLayout>
        {canManageOrg && (
          <Tabs
            centered
            value={tab}
            sx={{ my: 2 }}
            aria-label="profile-tabs"
            onChange={(_: React.SyntheticEvent, value: string) =>
              router.push(`/profile?tab=${value}`)
            }
          >
            <Tab
              label="Profile"
              value="profile"
              id="profile-tab"
              aria-controls="profile-tab"
            />
            <Tab
              label="Users"
              value="users"
              id="users-tab"
              aria-controls="users-tab"
            />
            <Tab
              label="Organization"
              value="organization"
              id="organization-tab"
              aria-controls="organization-tab"
            />
          </Tabs>
        )}

        {tab === "organization" ? (
          <Organization />
        ) : tab === "users" ? (
          <Box>
            <Users />
            <Invites />
          </Box>
        ) : (
          <Profile />
        )}
      </HeaderLayout>
    </>
  )
}

const Card = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ width: "100%", my: 8 }}>{children}</Box>
}

const Profile = () => {
  return (
    <>
      <Card>
        <SelectTheme />
      </Card>

      <Card>
        <UpdateProfile />
      </Card>

      <Card>
        <UpdatePassword />
      </Card>
    </>
  )
}

const Users = () => {
  const API = useApi()
  const { state } = useAppContext()

  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [actionLoading, setActionLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await API({
        uri: ENDPOINTS.organizationUsers,
      })

      setData(
        response.data.filter(
          (user: User) => user._id !== state?.auth?.user?._id
        )
      )
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (row: User, role: string) => {
    try {
      setActionLoading(true)

      await API({
        method: "PUT",
        message: "User updated successfully",
        uri: `${ENDPOINTS.organizationUsers}/${row._id}`,
        body: JSON.stringify({
          role,
        }),
      })

      setData((s) =>
        s.map((e: User) => {
          if (e._id === row._id) e.role = role
          return e
        })
      )
    } catch (error: any) {
    } finally {
      setActionLoading(false)
    }
  }

  const removeUser = async (_id: string) => {
    try {
      setActionLoading(true)

      await API({
        method: "DELETE",
        message: "User deleted successfully",
        uri: `${ENDPOINTS.organizationUsers}/${_id}`,
      })

      setData((s) => s.filter((e: User) => e._id !== _id))
    } catch (error: any) {
    } finally {
      setActionLoading(false)
    }
  }

  const Columns = useMemo(
    () => [
      {
        key: "name",
        value: "Name",
        minWidth: 170,
        render: (row: User) => getFullName(row),
      },
      {
        key: "email",
        value: "Email",
      },
      {
        key: "role",
        value: "Role",
        render: (row: User) => (
          <Select
            size="small"
            value={row.role}
            disabled={actionLoading}
            onChange={(event: any) => updateUserRole(row, event.target.value)}
            options={["user", "admin"].map((option: string) => ({
              key: option,
              value: toTitleCase(option),
            }))}
          />
        ),
      },
      {
        key: "actions",
        value: "Actions",
        render: (row: User) => (
          <Confirm
            title="Delete User"
            onConfirm={() => removeUser(row._id)}
            message="Are you sure you want to delete this user?"
            trigger={({ toggleOpen }: { toggleOpen: () => void }) => (
              <IconButton
                size="small"
                color="error"
                aria-label="remove"
                onClick={toggleOpen}
                tooltip="Remove user"
                loading={actionLoading}
              >
                <Delete fontSize="inherit" />
              </IconButton>
            )}
          />
        ),
      },
    ],
    // eslint-disable-next-line
    [data, actionLoading]
  )

  return (
    <Box>
      <Title sx={{ mb: 2 }}>Current Users</Title>
      <DataTable data={data} columns={Columns} loading={loading} />
    </Box>
  )
}

const Invites = () => {
  const API = useApi()

  const [data, setData] = useState<Invite[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [actionLoading, setActionLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await API({
        uri: ENDPOINTS.invites,
      })

      setData(response.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const resendInvite = async (_id: string) => {
    try {
      setActionLoading(true)

      await API({
        method: "POST",
        uri: `${ENDPOINTS.resendInvite}/${_id}`,
        message: "Invite resent",
      })
    } catch (error: any) {
    } finally {
      setActionLoading(false)
    }
  }

  const deleteInvite = async (_id: string) => {
    try {
      setActionLoading(true)

      await API({
        method: "DELETE",
        uri: `${ENDPOINTS.invites}/${_id}`,
        message: "Invite deleted successfully",
      })

      setData((s) => s.filter((e: Invite) => e._id !== _id))
    } catch (error: any) {
    } finally {
      setActionLoading(false)
    }
  }

  const Columns = useMemo(
    () => [
      {
        key: "name",
        value: "Name",
        render: (row: Invite) => getFullName(row),
      },
      {
        key: "email",
        value: "Email",
      },
      {
        key: "actions",
        value: "Actions",
        render: (row: Invite) => (
          <>
            <IconButton
              size="small"
              tooltip="Resend"
              aria-label="resend"
              loading={actionLoading}
              onClick={() => resendInvite(row._id)}
            >
              <ReplayIcon fontSize="inherit" />
            </IconButton>

            <Confirm
              title="Delete Invite"
              onConfirm={() => deleteInvite(row._id)}
              message="Are you sure you want to delete this invite?"
              trigger={({ toggleOpen }: { toggleOpen: () => void }) => (
                <IconButton
                  size="small"
                  color="error"
                  tooltip="Delete"
                  aria-label="delete"
                  onClick={toggleOpen}
                  loading={actionLoading}
                >
                  <Delete fontSize="inherit" />
                </IconButton>
              )}
            />
          </>
        ),
      },
    ],
    // eslint-disable-next-line
    [data, actionLoading]
  )

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title sx={{ my: 2 }}>Invites </Title>
        <Dialog
          title="Invite User"
          trigger={({ toggleOpen }: { toggleOpen: () => void }) => (
            <Button size="small" onClick={toggleOpen}>
              + User
            </Button>
          )}
          content={({ onClose }: { onClose: () => void }) => (
            <InviteUser
              onClose={onClose}
              onSubmit={(value) => setData((s) => [...s, value])}
            />
          )}
        />
      </Box>

      <DataTable data={data} columns={Columns} loading={loading} />
    </Box>
  )
}

const Organization = () => {
  return (
    <Card>
      <UpdateOrganization />
    </Card>
  )
}
