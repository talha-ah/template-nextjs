import Head from "next/head"
import * as React from "react"
import { useState, useEffect, useMemo } from "react"

import { Tabs, Tab } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { Replay as ReplayIcon } from "@mui/icons-material"

import { useApi } from "@hooks/useApi"
import { Button } from "@components/Button"
import { User, Invite } from "@utils/types"
import { apiLimit } from "@utils/constants"
import { Dialog } from "@components/Dialog"
import { endpoints } from "@utils/constants"
import { Confirm } from "@components/Confirm"
import { DrawerLayout } from "@layouts/Drawer"
import { useAppContext } from "@contexts/index"
import { DataTable } from "@components/DataTable"
import { IconButton } from "@components/IconButton"
import { InviteUser, EditUser } from "@forms/users"

export default function Users() {
  const [api] = useApi()
  const { state } = useAppContext()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(+apiLimit)
  const [totalPages, setTotalPages] = useState(1)

  const [tab, setTab] = useState<number>(0)
  const [items, setItems] = useState<User[]>([])
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [invitesLoading, setInvitesLoading] = useState<boolean>(true)
  const [removeUserLoading, setRemoveUserLoading] = useState<boolean>(false)
  const [inviteDeleteLoading, setInviteDeleteLoading] = useState<boolean>(false)
  const [inviteResendLoading, setInviteResendLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchItems()

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchInvites()

    // eslint-disable-next-line
  }, [page, limit])

  const fetchItems = async () => {
    try {
      setLoading(true)

      const response = await api({
        uri: endpoints.organizationUsers,
      })

      setItems(response?.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const fetchInvites = async () => {
    try {
      setInvitesLoading(true)

      const response = await api({
        uri: `${endpoints.invites}?page=${page}&limit=${limit}`,
      })

      setInvites(response?.data)
      setTotalPages(response?.totalPages || 1)
    } catch (error) {
    } finally {
      setInvitesLoading(false)
    }
  }

  const deleteInvite = async (_id: string) => {
    try {
      setInviteDeleteLoading(true)

      await api({
        method: "DELETE",
        uri: `${endpoints.invites}/${_id}`,
        message: "Invite deleted successfully",
      })

      setInvites((s) => s.filter((e: Invite) => e._id !== _id))
    } catch (error: any) {
    } finally {
      setInviteDeleteLoading(false)
    }
  }

  const removeUser = async (_id: string) => {
    try {
      setRemoveUserLoading(true)

      await api({
        method: "DELETE",
        uri: `${endpoints.organizationUsers}/${_id}`,
        message: "User deleted successfully",
      })

      setItems((s) => s.filter((e: User) => e._id !== _id))
    } catch (error: any) {
    } finally {
      setRemoveUserLoading(false)
    }
  }

  const resendInvite = async (_id: string) => {
    try {
      setInviteResendLoading(true)

      await api({
        method: "POST",
        uri: `${endpoints.resendInvite}/${_id}`,
        message: "Invite resent",
      })
    } catch (error: any) {
    } finally {
      setInviteResendLoading(false)
    }
  }

  const columns = useMemo(
    () => [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        render: (e: User) => `${e.firstName || ""} ${e.lastName || ""}`,
      },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "phone",
        label: "Phone",
      },
      {
        id: "lastLoginAt",
        label: "Last Login",
        format: (e?: Date) => (e ? new Date(e).toLocaleString() : ""),
      },
      {
        id: "actions",
        label: "Actions",
        render: (row: Invite) => (
          <>
            <Dialog
              title="Edit User"
              trigger={({ toggleOpen }: { toggleOpen: () => void }) => (
                <IconButton
                  size="small"
                  tooltip="Edit"
                  aria-label="edit"
                  onClick={toggleOpen}
                >
                  <Edit fontSize="inherit" />
                </IconButton>
              )}
              content={({ onClose }: { onClose: () => void }) => (
                <EditUser
                  value={row}
                  onClose={onClose}
                  onSubmit={(value) => {
                    let rows = [...items]
                    let index = rows.findIndex((e) => e._id === row._id)
                    rows[index].firstName = value.firstName
                    rows[index].lastName = value.lastName
                    rows[index].email = value.email
                    setItems(rows)
                  }}
                />
              )}
            />

            {state.auth.user.email !== row.email && (
              <Confirm
                title="Delete User"
                onConfirm={() => removeUser(row._id)}
                message="Are you sure you want to delete this user?"
                trigger={({ toggleOpen }: { toggleOpen: () => void }) => (
                  <IconButton
                    size="small"
                    color="error"
                    aria-label="remove"
                    tooltip="Remove user"
                    onClick={toggleOpen}
                    loading={removeUserLoading}
                  >
                    <Delete fontSize="inherit" />
                  </IconButton>
                )}
              />
            )}
          </>
        ),
      },
    ],
    // eslint-disable-next-line
    [removeUserLoading, items]
  )

  const inviteColumns = useMemo(
    () => [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        render: (e: Invite) => `${e.firstName || ""} ${e.lastName || ""}`,
      },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "actions",
        label: "Actions",
        render: (row: Invite) => (
          <>
            <IconButton
              size="small"
              tooltip="Resend"
              aria-label="resend"
              loading={inviteResendLoading}
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
                  loading={inviteDeleteLoading}
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
    [invites, inviteDeleteLoading, inviteResendLoading]
  )

  return (
    <>
      <Head>
        <title>Users - Six Wraps</title>
      </Head>

      <DrawerLayout
        title="Users"
        actions={
          <Dialog
            title="Invite User"
            trigger={({ toggleOpen }: { toggleOpen: () => void }) => (
              <Button size="small" onClick={toggleOpen}>
                Invite User
              </Button>
            )}
            content={({ onClose }: { onClose: () => void }) => (
              <InviteUser
                onClose={onClose}
                onSubmit={(value) => {
                  setInvites((s) => [...s, value])
                }}
              />
            )}
          />
        }
      >
        <Tabs
          value={tab}
          sx={{ mb: 2 }}
          aria-label="users-tabs"
          onChange={(_: React.SyntheticEvent, value: number) => setTab(value)}
        >
          <Tab
            label="Users"
            id={`simple-tab-${1}`}
            aria-controls={`simple-tab-${1}`}
          />
          <Tab
            label="Invites"
            id={`simple-tab-${2}`}
            aria-controls={`simple-tab-${2}`}
          />
        </Tabs>

        {tab === 0 ? (
          <DataTable data={items} columns={columns} loading={loading} />
        ) : (
          <DataTable
            page={page}
            limit={limit}
            data={invites}
            onPageChange={setPage}
            columns={inviteColumns}
            totalPages={totalPages}
            loading={invitesLoading}
            onLimitChange={setLimit}
          />
        )}
      </DrawerLayout>
    </>
  )
}
